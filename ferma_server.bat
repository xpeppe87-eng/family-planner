@echo off
title Family Planner - Arresto Server
echo ======================================================================
echo                 ARRESTO SERVER FAMILY PLANNER
echo ======================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "$conns = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue; if ($conns) { foreach ($c in $conns) { Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue }; Write-Host 'Server su porta 8080 arrestato con successo.' -ForegroundColor Green } else { Write-Host 'Nessun server attivo rilevato sulla porta 8080.' -ForegroundColor Yellow }"
echo.
echo Operazione completata.
timeout /t 3 >nul
