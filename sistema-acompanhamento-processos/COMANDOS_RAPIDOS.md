# ⚡ Comandos Rápidos - Referência

Guia de referência rápida com todos os comandos necessários.

---

## 🚀 Iniciando o Sistema (Jeito Mais Fácil)

### Windows:
```
Clique 2x em: INICIAR.bat
```

---

## 📦 Instalação Inicial (Primeira Vez)

### 1. Instalar dependências do Backend:

```bash
cd backend
npm install
```

### 2. Instalar dependências do Frontend:

```bash
cd frontend
npm install
```

### Ou use o atalho (Windows):
```
Clique 2x em: instalar.bat
```

---

## ▶️ Iniciar Manualmente

### Terminal 1 - Backend:

```bash
cd backend
npm start
```

**Aguarde ver:** `Servidor rodando na porta 3001`

---

### Terminal 2 - Frontend:

```bash
cd frontend
npm start
```

**O navegador abrirá automaticamente em:** http://localhost:3000

---

## 🛑 Parar o Sistema

Em cada terminal (backend e frontend):

```
Pressione: Ctrl + C
Digite: S
Aperte: Enter
```

---

## 🧹 Limpar e Reinstalar (Se tiver problemas)

### Backend:

```bash
cd backend
rd /s /q node_modules          # Windows
rm -rf node_modules             # Linux/Mac
npm cache clean --force
npm install
```

### Frontend:

```bash
cd frontend
rd /s /q node_modules          # Windows
rm -rf node_modules             # Linux/Mac
npm cache clean --force
npm install
```

---

## 🔧 Resolver Problemas Específicos

### Erro: Porta 3001 ocupada

**Windows:**
```bash
netstat -ano | findstr :3001
taskkill /PID [NUMERO] /F
```

**Linux/Mac:**
```bash
lsof -i :3001
kill -9 [PID]
```

### Erro: Porta 3000 ocupada

**Solução:** Digite `Y` quando o sistema perguntar se quer usar outra porta

### Recriar banco de dados:

```bash
cd backend\database
del processos.db               # Windows
rm processos.db                # Linux/Mac
```

O banco será recriado automaticamente ao iniciar o backend

---

## 📊 Comandos Úteis

### Verificar versão do Node.js:
```bash
node --version
```

### Verificar versão do npm:
```bash
npm --version
```

### Ver processos rodando nas portas:

**Windows:**
```bash
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

**Linux/Mac:**
```bash
lsof -i :3000
lsof -i :3001
```

---

## 🌐 URLs do Sistema

### Frontend (Interface):
```
http://localhost:3000
```

### Backend (API):
```
http://localhost:3001
```

### Testar se a API está funcionando:
```
http://localhost:3001/api
```

Deve retornar:
```json
{"mensagem":"API de Acompanhamento de Processos"}
```

---

## 📂 Navegação entre pastas

### Ir para pasta do backend:

**Windows:**
```bash
cd "C:\Users\marcos.santos\OneDrive\Documentos\Marcos\Produtividade PGM\sistema-acompanhamento-processos\backend"
```

**Atalho relativo (de dentro da pasta do projeto):**
```bash
cd backend
```

### Ir para pasta do frontend:

**Windows:**
```bash
cd "C:\Users\marcos.santos\OneDrive\Documentos\Marcos\Produtividade PGM\sistema-acompanhamento-processos\frontend"
```

**Atalho relativo:**
```bash
cd frontend
```

### Voltar uma pasta:
```bash
cd ..
```

### Voltar para raiz do projeto:
```bash
cd "C:\Users\marcos.santos\OneDrive\Documentos\Marcos\Produtividade PGM\sistema-acompanhamento-processos"
```

---

## 🔄 Atualizar após mudanças no código

### Se mudou código do Backend:
```bash
# Parar (Ctrl+C no terminal do backend)
# Depois:
npm start
```

### Se mudou código do Frontend:
```bash
# O React recarrega automaticamente
# Mas se não funcionar:
# Parar (Ctrl+C no terminal do frontend)
# Depois:
npm start
```

---

## 🗑️ Limpar cache do navegador

**Chrome/Edge:**
```
Ctrl + Shift + Del
```

Marque: "Imagens e arquivos em cache"
Clique: "Limpar dados"

**Ou force reload:**
```
Ctrl + F5
```

---

## 📝 Criar novo usuário (via terminal - avançado)

Não recomendado para iniciantes. Use a interface web.

---

## 🔐 Alterar porta do Backend

**Edite:** `backend/.env`

```env
PORT=3002
```

**IMPORTANTE:** Se mudar, altere também em:
`frontend/src/services/api.js`

Linha:
```javascript
baseURL: 'http://localhost:3002/api'
```

---

## 🎯 Comandos Git (Para subir no GitHub)

### Primeira vez:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/SEU-USUARIO/sistema-acompanhamento-processos.git
git branch -M main
git push -u origin main
```

### Atualizações posteriores:

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

---

## 🔍 Verificar se está tudo funcionando

### Checklist:

```bash
# 1. Node.js instalado?
node --version

# 2. Dependências instaladas?
# Deve existir: backend/node_modules/
# Deve existir: frontend/node_modules/

# 3. Backend rodando?
# Terminal deve mostrar: "Servidor rodando na porta 3001"

# 4. Frontend rodando?
# Terminal deve mostrar: "webpack compiled successfully"

# 5. API acessível?
# Abra no navegador: http://localhost:3001
# Deve retornar JSON

# 6. Interface acessível?
# Abra no navegador: http://localhost:3000
# Deve mostrar tela de login
```

---

## 📌 Atalhos do Terminal/Prompt

### Limpar tela:
```bash
cls        # Windows
clear      # Linux/Mac
```

### Cancelar comando:
```bash
Ctrl + C
```

### Colar no terminal:
```bash
Botão direito do mouse
# ou
Ctrl + V    # Alguns terminais
```

### Ver histórico:
```bash
Seta para cima ↑
```

---

## 💾 Backup dos dados

### Localização do banco de dados:
```
backend/database/processos.db
```

### Como fazer backup:

**Windows:**
```bash
copy "backend\database\processos.db" "backup-processos.db"
```

**Linux/Mac:**
```bash
cp backend/database/processos.db backup-processos.db
```

---

## 🆘 Comando de Emergência (Resetar tudo)

**⚠️ ATENÇÃO: Isso apaga todos os dados!**

```bash
# Apagar banco de dados
del backend\database\processos.db        # Windows
rm backend/database/processos.db         # Linux/Mac

# Apagar node_modules
rd /s /q backend\node_modules           # Windows
rd /s /q frontend\node_modules          # Windows
rm -rf backend/node_modules             # Linux/Mac
rm -rf frontend/node_modules            # Linux/Mac

# Reinstalar tudo
cd backend
npm install

cd ..\frontend                          # Windows
cd ../frontend                          # Linux/Mac
npm install
```

---

## 📚 Onde buscar mais informações

- **Guia completo:** `INICIO_RAPIDO.md`
- **Problemas:** `SOLUCAO_PROBLEMAS.md`
- **Visual:** `GUIA_VISUAL.md`
- **Documentação:** `README.md`

---

## ✅ Comandos mais usados no dia a dia

```bash
# Iniciar backend
cd backend && npm start

# Iniciar frontend (outro terminal)
cd frontend && npm start

# Parar
Ctrl + C (em cada terminal)
```

**Ou simplesmente:**
```
Clique 2x em: INICIAR.bat  ⭐
```

---

## 🎯 Resumão Final

| Ação | Comando |
|------|---------|
| Instalar Node.js | Baixar de nodejs.org |
| Instalar dependências | `npm install` |
| Iniciar backend | `cd backend && npm start` |
| Iniciar frontend | `cd frontend && npm start` |
| Parar | `Ctrl + C` |
| Acessar sistema | http://localhost:3000 |
| Ver API | http://localhost:3001 |
| Limpar cache npm | `npm cache clean --force` |
| Reinstalar | Delete node_modules e rode `npm install` |

---

**Dica:** Salve este arquivo nos favoritos para consulta rápida! 📌
