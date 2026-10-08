@echo off
title Family Planner - Abilita Accesso Telefoni nel Firewall
echo ======================================================================
echo       ABILITAZIONE ACCESSO DA SMARTPHONE (FIREWALL WINDOWS)
echo ======================================================================
echo.
echo Questa operazione serve a consentire ai telefoni collegati al tuo Wi-Fi
echo di visualizzare l'app Family Planner senza essere bloccati da Windows Defender.
echo.

net session >nul 2>&1
if %errorLevel% == 0 (
    echo [OK] Permessi di amministratore rilevati. Applicazione regole in corso...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Remove-NetFirewallRule -DisplayName 'Family Planner*' -ErrorAction SilentlyContinue; New-NetFirewallRule -DisplayName 'Family Planner Server' -Description 'Consente accesso a Family Planner da smartphone e tablet in rete' -Direction Inbound -LocalPort 8080,8081,8088,3000 -Protocol TCP -Action Allow -Profile Any; Get-NetConnectionProfile | Set-NetConnectionProfile -NetworkCategory Private -ErrorAction SilentlyContinue; Write-Host '`nRegola Firewall aggiunta con successo per tutti i profili di rete!' -ForegroundColor Green"
    echo.
    echo ======================================================================
    echo   PERFETTO! ORA I CELLULARI POSSONO CONNETTERSI AL SERVER!
    echo   Avvia 'avvia_server.bat' e apri sul telefono l'indirizzo mostrato
    echo   (oppure inquadra il QR code sullo schermo del computer).
    echo ======================================================================
    echo.
    pause
) else (
    echo Richiesta permessi di amministratore... Si aprira una finestra di conferma di Windows.
    echo Clicca su 'Si' per consentire l'abilitazione.
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process cmd -ArgumentList '/c \"\"%~f0\"\"' -Verb RunAs"
)
