# 🚀 Guia de Deploy no Vercel - Sistema de Acompanhamento de Processos

## Método Recomendado: Deploy com Root Directory

### Passo 1: Criar Novo Projeto no Vercel

1. Acesse: https://vercel.com
2. Faça login com sua conta (GitHub, GitLab ou Bitbucket)
3. Clique no botão **"Add New..."** → **"Project"**

### Passo 2: Importar Repositório

1. Na lista de repositórios, localize: **`Produtividade-PGM`**
2. Clique em **"Import"** ao lado do repositório

### Passo 3: Configurar o Projeto ⚙️

**IMPORTANTE:** Antes de fazer o deploy, configure estas opções:

#### 3.1 - Framework Preset
- Selecione: **`Create React App`**

#### 3.2 - Root Directory 📁
- Clique em **"Edit"** ao lado de "Root Directory"
- Digite: `sistema-acompanhamento-processos/frontend`
- ✅ Esta é a configuração mais importante!

#### 3.3 - Build and Output Settings
O Vercel vai detectar automaticamente, mas verifique:
- **Build Command:** `npm run build` (ou deixe em branco)
- **Output Directory:** `build` (ou deixe em branco)
- **Install Command:** `npm install` (ou deixe em branco)

#### 3.4 - Environment Variables (Variáveis de Ambiente)
Clique em **"Add Environment Variable"** e adicione:

| Name | Value | Environment |
|------|-------|-------------|
| `REACT_APP_API_URL` | `http://localhost:3001/api` | All |

⚠️ **ATENÇÃO:** Por enquanto, use `http://localhost:3001/api`. Depois de hospedar o backend, você voltará aqui para atualizar com a URL real do backend em produção.

### Passo 4: Deploy 🎯

1. Clique no botão **"Deploy"**
2. Aguarde o processo de build (1-3 minutos)
3. ✅ Pronto! Seu frontend estará no ar

### Passo 5: Acessar o Projeto

Após o deploy, você receberá uma URL como:
- `https://seu-projeto.vercel.app`

---

## 📝 Configurações Adicionais (Opcional)

### Alterar Nome do Domínio

1. Vá em: **Settings → Domains**
2. Adicione um domínio customizado ou renomeie o subdomínio

### Configurar Node.js Version

1. Vá em: **Settings → General**
2. Role até **"Node.js Version"**
3. Selecione: **`18.x`** (recomendado)

### Variáveis de Ambiente

Para atualizar a URL da API depois de hospedar o backend:

1. Vá em: **Settings → Environment Variables**
2. Edite `REACT_APP_API_URL`
3. Substitua por: `https://url-do-seu-backend.com/api`
4. Clique em **"Save"**
5. Vá em: **Deployments → ... (menu) → Redeploy**

---

## ⚠️ Próximos Passos

### 1. Hospedar o Backend

O frontend precisa do backend para funcionar. Opções recomendadas:

#### **Render (Grátis e Fácil)** ⭐ Recomendado

1. Acesse: https://render.com
2. Crie uma conta (pode usar GitHub)
3. Clique em **"New +"** → **"Web Service"**
4. Conecte o repositório `Produtividade-PGM`
5. Configure:
   - **Name:** `pgm-backend` (ou outro nome)
   - **Root Directory:** `sistema-acompanhamento-processos/backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node src/server.js`
   - **Instance Type:** `Free`

6. Adicione as variáveis de ambiente:
   - `PORT`: `3001`
   - `JWT_SECRET`: `seu_secret_super_seguro_aqui`
   - `NODE_ENV`: `production`

7. Clique em **"Create Web Service"**

8. Após o deploy, copie a URL (exemplo: `https://pgm-backend.onrender.com`)

9. **Volte no Vercel** e atualize a variável `REACT_APP_API_URL` para:
   ```
   https://pgm-backend.onrender.com/api
   ```

#### **Railway (Alternativa)**

1. Acesse: https://railway.app
2. Similar ao processo do Render
3. Conecte o repositório e configure o root directory

---

## 🔧 Solução de Problemas

### Erro 404 no Vercel
- ✅ Verifique se o **Root Directory** está configurado como `sistema-acompanhamento-processos/frontend`
- ✅ Confirme que o Framework Preset é `Create React App`

### Erro de Build
- Verifique os logs de build no Vercel
- Certifique-se de que o Node.js version é 18.x
- Tente fazer "Clear Cache and Redeploy"

### Frontend carrega mas não conecta à API
- ✅ Verifique se a variável `REACT_APP_API_URL` está configurada
- ✅ Confirme que o backend está rodando e acessível
- ✅ Verifique CORS no backend (deve permitir a origem do Vercel)

### Erro de CORS
No backend, adicione no arquivo `src/server.js`:

```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://seu-projeto.vercel.app',
  credentials: true
}));
```

---

## 📚 Recursos Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Render](https://render.com/docs)
- [Create React App - Deployment](https://create-react-app.dev/docs/deployment)

---

## ✅ Checklist Final

- [ ] Frontend deployado no Vercel
- [ ] Root Directory configurado corretamente
- [ ] Backend hospedado (Render/Railway)
- [ ] Variável `REACT_APP_API_URL` atualizada com URL do backend
- [ ] CORS configurado no backend
- [ ] Teste login funcionando
- [ ] Teste criação de processo funcionando

---

**Pronto! Seu sistema estará completamente online! 🎉**

Se precisar de ajuda em algum passo específico, consulte a seção de Solução de Problemas ou peça suporte.
