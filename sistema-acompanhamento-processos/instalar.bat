@echo off
echo ========================================
echo Instalando dependencias do projeto
echo ========================================
echo.

echo Instalando dependencias do Backend...
cd backend
call npm install
echo.

echo Instalando dependencias do Frontend...
cd ..\frontend
call npm install
echo.

echo ========================================
echo Instalacao concluida!
echo ========================================
echo.
echo Para iniciar o projeto:
echo 1. Abra um terminal e execute: cd backend ^&^& npm start
echo 2. Abra outro terminal e execute: cd frontend ^&^& npm start
echo.
pause
