@echo off
chcp 65001 >nul
title Family Planner - Server Locale
echo ======================================================================
echo           AVVIO SERVER FAMILY PLANNER PER LA TUA RETE WI-FI
echo ======================================================================
echo.
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1" -port 8080
pause
