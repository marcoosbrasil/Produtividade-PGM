@echo off
echo ========================================
echo  SISTEMA DE ACOMPANHAMENTO DE PROCESSOS
echo ========================================
echo.
echo Iniciando o sistema...
echo.
echo IMPORTANTE: Duas janelas irao abrir:
echo - Uma para o BACKEND (servidor)
echo - Uma para o FRONTEND (interface)
echo.
echo NAO FECHE essas janelas enquanto usar o sistema!
echo.
echo Aguarde o navegador abrir automaticamente...
echo Se nao abrir, acesse: http://localhost:3000
echo.
echo ========================================
echo.
pause

echo Iniciando BACKEND...
start cmd /k "cd backend && npm start"

timeout /t 3 /nobreak >nul

echo Iniciando FRONTEND...
start cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo Sistema iniciado!
echo ========================================
echo.
echo Feche esta janela.
timeout /t 5 /nobreak >nul
exit
