#!/bin/bash

echo "========================================"
echo "Instalando dependências do projeto"
echo "========================================"
echo ""

echo "Instalando dependências do Backend..."
cd backend
npm install
echo ""

echo "Instalando dependências do Frontend..."
cd ../frontend
npm install
echo ""

echo "========================================"
echo "Instalação concluída!"
echo "========================================"
echo ""
echo "Para iniciar o projeto:"
echo "1. Abra um terminal e execute: cd backend && npm start"
echo "2. Abra outro terminal e execute: cd frontend && npm start"
echo ""
