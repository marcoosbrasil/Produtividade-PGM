# 🔧 Solução: Erro ENOENT no Render

## ❌ Erro Apresentado

```
npm error code ENOENT
npm error syscall open
npm error path /opt/render/project/src/package.json
npm error errno -2
npm error enoent Could not read package.json: Error: ENOENT: no such file or directory
```

## 🔍 Causa

O Render está procurando o `package.json` no lugar errado porque o **Root Directory** não foi configurado corretamente.

---

## ✅ Solução 1: Corrigir Root Directory (Mais Rápida)

### Passo 1: Acessar Settings

1. Acesse: https://dashboard.render.com
2. Clique no serviço **`pgm-backend`** (ou o nome que você deu)
3. No menu lateral esquerdo, clique em **"Settings"**

### Passo 2: Editar Root Directory

1. Role para baixo até a seção **"Build & Deploy"**
2. Encontre o campo **"Root Directory"**
3. Clique em **"Edit"**
4. Digite **exatamente**:
   ```
   sistema-acompanhamento-processos/backend
   ```
5. ⚠️ **ATENÇÃO:**
   - ✅ Correto: `sistema-acompanhamento-processos/backend`
   - ❌ Errado: `/sistema-acompanhamento-processos/backend`
   - ❌ Errado: `sistema-acompanhamento-processos/backend/`
   - ❌ Errado: `src/sistema-acompanhamento-processos/backend`

### Passo 3: Salvar e Redeploy

1. Clique em **"Save Changes"**
2. Vá para a aba **"Manual Deploy"** (ou role até o topo)
3. Clique em **"Deploy latest commit"**
4. Aguarde o build (2-5 minutos)

---

## ✅ Solução 2: Recriar o Serviço (Se a Solução 1 não funcionar)

### Passo 1: Deletar o Serviço Atual

1. No dashboard do Render, vá em **Settings**
2. Role até o final da página
3. Clique em **"Delete Web Service"**
4. Confirme a exclusão

### Passo 2: Criar Novo Web Service

1. Clique em **"New +"** → **"Web Service"**
2. Selecione o repositório **`Produtividade-PGM`**
3. Clique em **"Connect"**

### Passo 3: Configurar CORRETAMENTE ⚙️

Preencha com **atenção especial ao Root Directory**:

| Campo | Valor |
|-------|-------|
| **Name** | `pgm-backend` |
| **Region** | `Frankfurt (EU Central)` |
| **Branch** | `main` |
| **Root Directory** | `sistema-acompanhamento-processos/backend` ⚠️ |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node src/server.js` |
| **Instance Type** | `Free` |

### Passo 4: Adicionar Variáveis de Ambiente

| Key | Value |
|-----|-------|
| `PORT` | `3001` |
| `JWT_SECRET` | `seu_jwt_secret_super_seguro_123456789` |
| `NODE_ENV` | `production` |

### Passo 5: Deploy

1. Clique em **"Create Web Service"**
2. Aguarde o build
3. Verifique se aparece: ✅ "Live" (bolinha verde)

---

## 🧪 Como Verificar se Funcionou

### 1. Verificar os Logs

No Render, vá na aba **"Logs"** e você deve ver:

```
✅ Conectado ao banco de dados SQLite.
✅ Banco de dados inicializado com sucesso!
🚀 Servidor rodando na porta 3001
📡 API disponível em http://localhost:3001
```

### 2. Testar a API

Abra no navegador:
```
https://sua-url.onrender.com/
```

Deve retornar:
```json
{
  "mensagem": "API de Acompanhamento de Processos"
}
```

---

## 🔍 Estrutura de Diretórios (Para Referência)

O seu repositório tem esta estrutura:

```
Produtividade-PGM/                          <- Raiz do repositório
└── sistema-acompanhamento-processos/
    ├── backend/                             <- Root Directory aponta AQUI
    │   ├── package.json                     <- O Render precisa encontrar ESTE arquivo
    │   ├── src/
    │   │   └── server.js
    │   └── database/
    └── frontend/
        └── ...
```

Quando você configura:
- **Root Directory:** `sistema-acompanhamento-processos/backend`
- O Render vai para esse diretório e executa `npm install`
- Ele encontra o `package.json` ali dentro

---

## ⚠️ Erros Comuns

### Erro: "Still looking in the wrong place"

**Causa:** Você salvou mas não fez redeploy.

**Solução:** Sempre faça **"Manual Deploy"** → **"Deploy latest commit"** após salvar mudanças.

---

### Erro: "Build Command not found"

**Causa:** Build Command configurado incorretamente.

**Solução:** Use exatamente: `npm install`

---

### Erro: "Application failed to respond"

**Causa:** Start Command incorreto ou servidor não está escutando na porta correta.

**Solução:**
- Start Command deve ser: `node src/server.js`
- Verifique se `PORT` está nas variáveis de ambiente

---

## ✅ Checklist

Antes de fazer deploy, confirme:

- [ ] Root Directory: `sistema-acompanhamento-processos/backend` (sem `/` no início ou fim)
- [ ] Build Command: `npm install`
- [ ] Start Command: `node src/server.js`
- [ ] Runtime: `Node`
- [ ] Variáveis de ambiente configuradas (`PORT`, `JWT_SECRET`, `NODE_ENV`)

---

## 🎯 Próximos Passos

Após o deploy funcionar:

1. Copie a URL do backend (ex: `https://pgm-backend.onrender.com`)
2. Atualize no Vercel a variável `REACT_APP_API_URL`:
   ```
   https://pgm-backend.onrender.com/api
   ```
3. Faça redeploy do frontend no Vercel
4. Teste o sistema completo!

---

**Dica:** Se continuar com problemas, compartilhe os logs completos do Render para análise mais detalhada.
