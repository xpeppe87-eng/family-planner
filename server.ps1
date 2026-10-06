# ==============================================================================
# FAMILY PLANNER - SERVER LOCALE MULTI-DISPOSITIVO (WI-FI & LOCALE)
# Permette a tutti i membri della famiglia (Android, iPhone, PC) di connettersi
# e sincronizzare gli impegni in tempo reale.
# ==============================================================================

param(
    [int]$port = 8080
)

$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }
$dataPath = Join-Path $root "data.json"

# Rileva automaticamente l'indirizzo IP locale Wi-Fi per i cellulari
$localIp = "127.0.0.1"
try {
    $ips = [System.Net.Dns]::GetHostAddresses([System.Net.Dns]::GetHostName()) | 
           Where-Object { 
               $_.AddressFamily -eq [System.Net.Sockets.AddressFamily]::InterNetwork -and 
               $_.IPAddressToString -notlike "127.*" -and 
               $_.IPAddressToString -notlike "169.254*" 
           }
    if ($ips) {
        $localIp = $ips[0].IPAddressToString
    }
} catch {
    $localIp = "localhost"
}

# Tipi MIME supportati
$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webmanifest" = "application/manifest+json"
}

# Avvio listener TCP su tutte le interfacce (0.0.0.0)
$tcp = $null
$portsToTry = @($port, 8080, 3000, 8081, 8088)
foreach ($p in $portsToTry) {
    try {
        $tcp = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $p)
        $tcp.Start()
        $port = $p
        break
    } catch {
        $tcp = $null
    }
}

if (-not $tcp) {
    Write-Host "ERRORE: Impossibile avviare il server sulle porte testate." -ForegroundColor Red
    exit 1
}

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  FAMILY PLANNER - SERVER LOCALE MULTI-DISPOSITIVO ATTIVO" -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "  Accesso dal computer:        http://localhost:$port/" -ForegroundColor White
Write-Host "  Accesso da cellulari (Wi-Fi): http://$($localIp):$port/" -ForegroundColor Yellow
Write-Host "  Stato sincronizzazione:     Sincronizzazione API attiva (/api/data)" -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "Premi Ctrl+C per arrestare il server.`n"

while ($true) {
    try {
        $client = $tcp.AcceptTcpClient()
        $client.ReceiveTimeout = 6000
        $client.SendTimeout = 6000
        $stream = $client.GetStream()
        
        # Lettura accurata dei byte della richiesta HTTP
        $memStream = New-Object System.IO.MemoryStream
        $buffer = New-Object byte[] 4096
        $headerEndPos = -1
        $foundHeaderEnd = $false

        while (-not $foundHeaderEnd) {
            $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
            if ($bytesRead -le 0) { break }
            $memStream.Write($buffer, 0, $bytesRead)
            $currentBytes = $memStream.ToArray()
            for ($i = 0; $i -le $currentBytes.Length - 4; $i++) {
                if ($currentBytes[$i] -eq 13 -and $currentBytes[$i+1] -eq 10 -and $currentBytes[$i+2] -eq 13 -and $currentBytes[$i+3] -eq 10) {
                    $headerEndPos = $i
                    $foundHeaderEnd = $true
                    break
                }
            }
        }

        if (-not $foundHeaderEnd) {
            $client.Close()
            continue
        }

        $allBytes = $memStream.ToArray()
        $headerText = [System.Text.Encoding]::ASCII.GetString($allBytes, 0, $headerEndPos)
        $lines = $headerText -split "\r?\n"
        $reqLine = $lines[0]
        if ([string]::IsNullOrEmpty($reqLine)) {
            $client.Close()
            continue
        }

        $parts = $reqLine.Split(' ')
        if ($parts.Length -lt 2) {
            $client.Close()
            continue
        }

        $method = $parts[0].ToUpper()
        $rawPath = $parts[1]
        $path = $rawPath.Split('?')[0].TrimStart('/')
        if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }

        # Lettura Content-Length
        $contentLength = 0
        foreach ($hLine in $lines) {
            if ($hLine -match "^Content-Length:\s*(\d+)") {
                $contentLength = [int]$matches[1]
            }
        }

        # Estrazione esatta dei byte del body HTTP
        $bodyStart = $headerEndPos + 4
        $alreadyReadBodyBytes = $allBytes.Length - $bodyStart

        $bodyBytes = [byte[]]::new($contentLength)
        if ($contentLength -gt 0) {
            $copied = [Math]::Min($alreadyReadBodyBytes, $contentLength)
            if ($copied -gt 0) {
                [Array]::Copy($allBytes, $bodyStart, $bodyBytes, 0, $copied)
            }
            $remaining = $contentLength - $copied
            $offset = $copied
            while ($remaining -gt 0) {
                $read = $stream.Read($bodyBytes, $offset, $remaining)
                if ($read -le 0) { break }
                $offset += $read
                $remaining -= $read
            }
        }
        $body = [System.Text.Encoding]::UTF8.GetString($bodyBytes)

        # ENDPOINT API: SINCRONIZZAZIONE DATI PER TUTTA LA FAMIGLIA
        if ($rawPath -like "/api/data*") {
            if ($method -eq "OPTIONS") {
                $res = "HTTP/1.1 204 No Content`r`nAccess-Control-Allow-Origin: *`r`nAccess-Control-Allow-Methods: GET, POST, OPTIONS`r`nAccess-Control-Allow-Headers: Content-Type`r`nConnection: close`r`n`r`n"
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($res)
                $stream.Write($bytes, 0, $bytes.Length)
            } elseif ($method -eq "GET") {
                $json = "{}"
                if (Test-Path $dataPath) {
                    $json = [System.IO.File]::ReadAllText($dataPath, [System.Text.Encoding]::UTF8)
                }
                $jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($json)
                $header = "HTTP/1.1 200 OK`r`nContent-Type: application/json; charset=utf-8`r`nAccess-Control-Allow-Origin: *`r`nContent-Length: $($jsonBytes.Length)`r`nCache-Control: no-cache`r`nConnection: close`r`n`r`n"
                $hBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                $stream.Write($hBytes, 0, $hBytes.Length)
                $stream.Write($jsonBytes, 0, $jsonBytes.Length)
            } elseif ($method -eq "POST") {
                if (-not [string]::IsNullOrWhiteSpace($body)) {
                    [System.IO.File]::WriteAllText($dataPath, $body, [System.Text.Encoding]::UTF8)
                }
                $resMsg = '{"success":true,"updated":true}'
                $resBytes = [System.Text.Encoding]::UTF8.GetBytes($resMsg)
                $header = "HTTP/1.1 200 OK`r`nContent-Type: application/json; charset=utf-8`r`nAccess-Control-Allow-Origin: *`r`nContent-Length: $($resBytes.Length)`r`nConnection: close`r`n`r`n"
                $hBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
                $stream.Write($hBytes, 0, $hBytes.Length)
                $stream.Write($resBytes, 0, $resBytes.Length)
            }
            $client.Close()
            continue
        }

        # ENDPOINT API: INFORMAZIONI DI RETE (IP SERVER E DISPOSITIVI)
        if ($rawPath -like "/api/info*") {
            $info = @{
                localIp = $localIp
                port = $port
                url = "http://$($localIp):$port/"
            }
            $infoJson = ConvertTo-Json $info
            $jsonBytes = [System.Text.Encoding]::UTF8.GetBytes($infoJson)
            $header = "HTTP/1.1 200 OK`r`nContent-Type: application/json; charset=utf-8`r`nAccess-Control-Allow-Origin: *`r`nContent-Length: $($jsonBytes.Length)`r`nConnection: close`r`n`r`n"
            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
            $stream.Write($hBytes, 0, $hBytes.Length)
            $stream.Write($jsonBytes, 0, $jsonBytes.Length)
            $client.Close()
            continue
        }

        # SERVIZIO FILE STATICI
        $filePath = [System.IO.Path]::Combine($root, $path.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
        if ([System.IO.File]::Exists($filePath)) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $ctype = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) { $ctype = $mimeTypes[$ext] }
            
            $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
            $header = "HTTP/1.1 200 OK`r`nContent-Type: $ctype`r`nAccess-Control-Allow-Origin: *`r`nContent-Length: $($fileBytes.Length)`r`nCache-Control: no-cache`r`nConnection: close`r`n`r`n"
            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
            $stream.Write($hBytes, 0, $hBytes.Length)
            $stream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            $notFoundMsg = "404 Not Found: $path"
            $msgBytes = [System.Text.Encoding]::UTF8.GetBytes($notFoundMsg)
            $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($msgBytes.Length)`r`nConnection: close`r`n`r`n"
            $hBytes = [System.Text.Encoding]::UTF8.GetBytes($header)
            $stream.Write($hBytes, 0, $hBytes.Length)
            $stream.Write($msgBytes, 0, $msgBytes.Length)
        }

        $client.Close()
    } catch {
        # Ignora errori di disconnessione client improvvisa
    }
}
