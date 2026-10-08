# ==============================================================================
# FAMILY PLANNER - ABILITA ACCESSO SMARTPHONE NEL FIREWALL DI WINDOWS
# ==============================================================================

# Se non ha permessi di amministratore, rilancia se stesso chiedendo l'autorizzazione di Windows (UAC)
$identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = [Security.Principal.WindowsPrincipal]$identity
$isAdmin = $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "Richiesta permessi di amministratore in corso..." -ForegroundColor Yellow
    Write-Host "Clicca su 'Si' nella finestra di conferma di Windows (UAC)." -ForegroundColor Cyan
    try {
        $target = $PSCommandPath
        $arg = "-NoProfile -ExecutionPolicy Bypass -NoExit -Command `"& '$target'`""
        Start-Process powershell -ArgumentList $arg -Verb RunAs
        exit
    } catch {
        Write-Host ""
        Write-Host "Autorizzazione non concessa o annullata dall'utente." -ForegroundColor Red
        Write-Host "Premi un tasto per uscire..." -ForegroundColor Gray
        [Console]::ReadKey() | Out-Null
        exit 1
    }
}

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "      ABILITAZIONE ACCESSO DA SMARTPHONE (FIREWALL WINDOWS)" -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configurazione in corso..." -ForegroundColor White

try {
    # 1. Rimuove eventuali regole precedenti
    Remove-NetFirewallRule -DisplayName "Family Planner*" -ErrorAction SilentlyContinue

    # 2. Crea la nuova regola Firewall aperta per tutti i profili (Rete Privata, Pubblica, Dominio)
    New-NetFirewallRule -DisplayName "Family Planner Server" `
                        -Description "Consente a smartphone e tablet di accedere al server Family Planner in Wi-Fi" `
                        -Direction Inbound `
                        -LocalPort 8080,8081,8088,3000 `
                        -Protocol TCP `
                        -Action Allow `
                        -Profile Any | Out-Null

    # 3. Imposta profilo su Privato se consentito
    Get-NetConnectionProfile | Set-NetConnectionProfile -NetworkCategory Private -ErrorAction SilentlyContinue

    Write-Host ""
    Write-Host "======================================================================" -ForegroundColor Green
    Write-Host "  [OK] REGOLA FIREWALL APPLICATA CON SUCCESSO!" -ForegroundColor Green
    Write-Host "======================================================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "I tuoi cellulari possono ora collegarsi senza essere bloccati da Windows!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Cosa fare ora:" -ForegroundColor White
    Write-Host "1. Puoi chiudere questa finestra." -ForegroundColor Gray
    Write-Host "2. Apri 'avvia_server.bat' per avviare il Family Planner sul computer." -ForegroundColor Cyan
    Write-Host "3. Sul cellulare apri l'indirizzo mostrato (es. http://192.168.1.65:8080/) oppure inquadra il QR code." -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host "Errore durante l'applicazione delle regole:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host "Premi INVIO per chiudere questa finestra..." -ForegroundColor Cyan
Read-Host
