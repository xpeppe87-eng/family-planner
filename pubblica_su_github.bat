@echo off
chcp 65001 >nul
title Pubblicazione Family Planner su GitHub Pages
echo ======================================================================
echo    📅 FAMILY PLANNER - PUBBLICAZIONE SU GITHUB PAGES
echo ======================================================================
echo.
echo Invio delle ultime modifiche al repository GitHub:
echo https://github.com/xpeppe87-eng/family-planner.git
echo.
"C:\Program Files\Git\cmd\git.exe" add -A
"C:\Program Files\Git\cmd\git.exe" commit -m "feat: sincronizzazione e aggiornamenti per smartphone" >nul 2>&1
"C:\Program Files\Git\cmd\git.exe" push origin main
echo.
if %errorlevel% equ 0 (
    echo ======================================================================
    echo   ✅ SUCCESSO! I file sono stati pubblicati su GitHub.
    echo   La tua app sara' visibile online all'indirizzo:
    echo   https://xpeppe87-eng.github.io/family-planner/
    echo ======================================================================
) else (
    echo ======================================================================
    echo   ⚠️ Accesso richiesto: se si e' aperta una finestra nel browser,
    echo   autorizza l'accesso al tuo account GitHub e poi riprova.
    echo ======================================================================
)
echo.
pause
