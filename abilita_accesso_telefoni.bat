@echo off
title Family Planner - Abilita Accesso Telefoni nel Firewall
echo ======================================================================
echo       ABILITAZIONE ACCESSO DA SMARTPHONE (FIREWALL WINDOWS)
echo ======================================================================
echo.
echo Questa operazione serve a consentire ai telefoni collegati al tuo Wi-Fi
echo di visualizzare l'app Family Planner senza essere bloccati da Windows.
echo.

net session >nul 2>&1
if %errorLevel% == 0 (
    echo Permessi di amministratore rilevati. Applicazione regole in corso...
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Remove-NetFirewallRule -DisplayName 'Family Planner 8080' -ErrorAction SilentlyContinue; New-NetFirewallRule -DisplayName 'Family Planner 8080' -Direction Inbound -LocalPort 8080 -Protocol TCP -Action Allow; Get-NetConnectionProfile | Where-Object { $_.InterfaceAlias -eq 'Wi-Fi' } | Set-NetConnectionProfile -NetworkCategory Private; Write-Host '`nRegola Firewall aggiunta e Wi-Fi impostato su Rete Privata con successo!' -ForegroundColor Green"
    echo.
    echo Fatto! Ora i tuoi telefoni possono collegarsi all'indirizzo IP mostrato all'avvio del server (es. http://IP_DEL_PC:8080/).
    echo.
    pause
) else (
    echo Richiesta permessi di amministratore... Si aprira una finestra di conferma di Windows.
    powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process cmd -ArgumentList '/c \"\"%~f0\"\"' -Verb RunAs"
)
