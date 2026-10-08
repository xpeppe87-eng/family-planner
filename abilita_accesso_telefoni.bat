@echo off
chcp 65001 >nul
title Family Planner - Abilita Telefoni nel Firewall
cd /d "%~dp0"

echo ======================================================================
echo    ABILITAZIONE ACCESSO SMARTPHONE (FIREWALL WINDOWS)
echo ======================================================================
echo.
echo Avvio della configurazione di rete e firewall in corso...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0abilita_firewall.ps1"

echo.
echo ======================================================================
echo Se e apparsa la finestra di Windows PowerShell con la scritta verde
echo '[OK] REGOLA FIREWALL APPLICATA', l'operazione e completata!
echo.
echo In caso di problemi, puoi anche fare clic destro su questo file
echo e scegliere 'Esegui come amministratore'.
echo ======================================================================
echo.
echo Premi un tasto qualsiasi per chiudere...
pause >nul
