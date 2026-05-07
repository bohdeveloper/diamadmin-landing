@echo off
setlocal

REM ============================
REM   INICIANDO DIAMADMIN LANDING
REM ============================

REM ---------- RUTAS ----------
set PROJECT_ROOT=C:\Cursos\react\apps\diamadmin-landing
set FRONTEND_PATH=%PROJECT_ROOT%\frontend

echo.
echo Raiz del proyecto:
echo %PROJECT_ROOT%
echo.
echo Frontend:
echo %FRONTEND_PATH%

REM ---------- VALIDACION ----------
if not exist "%FRONTEND_PATH%\package.json" (
    echo.
    echo ERROR: No se encuentra package.json en:
    echo %FRONTEND_PATH%
    pause
    exit /b 1
)

REM ---------- DEPENDENCIAS ----------
cd /d "%FRONTEND_PATH%"
echo.
echo [LANDING] Comprobando dependencias...
if not exist "node_modules" (
    echo [LANDING] Instalando dependencias...
    call npm install
) else (
    echo [LANDING] Dependencias ya instaladas.
)

REM ---------- ARRANQUE REAL ----------
echo.
echo Arrancando LANDING...
start "Diamadmin Landing" /D "%FRONTEND_PATH%" cmd /k npm run dev

echo.
echo Landing disponible en:
echo http://localhost:3000
pause