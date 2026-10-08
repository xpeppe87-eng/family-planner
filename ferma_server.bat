@echo off
title Family Planner - Arresto Server
echo ======================================================================
echo                 ARRESTO SERVER FAMILY PLANNER
echo ======================================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ports = @(8080, 8081, 8088, 3000); $stopped = 0; foreach ($p in $ports) { $conns = Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue; if ($conns) { foreach ($c in $conns) { Stop-Process -Id $c.OwningProcess -Force -ErrorAction SilentlyContinue; $stopped++ } } }; if ($stopped -gt 0) { Write-Host 'Server arrestato con successo.' -ForegroundColor Green } else { Write-Host 'Nessun server attivo rilevato in ascolto.' -ForegroundColor Yellow }"
echo.
echo Operazione completata.
timeout /t 3 >nul
