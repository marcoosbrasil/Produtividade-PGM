# 🚀 Guia de Deploy do Backend no Render

## Por que Render para o Backend?

✅ **Gratuito** - Plano free tier generoso
✅ **Compatível com SQLite** - Mantém arquivos persistentes
✅ **Fácil de configurar** - Deploy em poucos minutos
✅ **CI/CD automático** - Deploy automático a cada push no GitHub

---

## 📋 Pré-requisitos

- [ ] Código do backend no GitHub (repositório `Produtividade-PGM`)
- [ ] Conta no GitHub
- [ ] Frontend já deployado no Vercel (opcional, mas recomendado)

---

## 🎯 Passo a Passo

### Passo 1: Criar Conta no Render

1. Acesse: https://render.com
2. Clique em **"Get Started for Free"**
3. Faça login com sua conta do **GitHub**
4. Autorize o Render a acessar seus repositórios

### Passo 2: Criar Novo Web Service

1. No dashboard do Render, clique em **"New +"** (canto superior direito)
2. Selecione **"Web Service"**
3. Na lista de repositórios, localize: **`Produtividade-PGM`**
4. Clique em **"Connect"** ao lado do repositório

### Passo 3: Configurar o Web Service ⚙️

Preencha os campos conforme abaixo:

#### 3.1 - Informações Básicas

| Campo | Valor |
|-------|-------|
| **Name** | `pgm-backend` (ou o nome que preferir) |
| **Region** | `Frankfurt (EU Central)` (ou mais próximo de você) |
| **Branch** | `main` |
| **Root Directory** | `sistema-acompanhamento-processos/backend` |

⚠️ **IMPORTANTE:** O Root Directory é crucial! Sem ele, o Render não encontrará o backend.

#### 3.2 - Build Settings

| Campo | Valor |
|-------|-------|
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node src/server.js` |

#### 3.3 - Instance Type

Selecione: **`Free`** (0 USD/mês)

⚠️ **Atenção:** O plano gratuito "dorme" após 15 minutos de inatividade. A primeira requisição após isso pode levar 30-60 segundos para "acordar" o serviço.

### Passo 4: Configurar Variáveis de Ambiente 🔐

Role para baixo até a seção **"Environment Variables"** e adicione:

| Key | Value |
|-----|-------|
| `PORT` | `3001` |
| `JWT_SECRET` | `seu_jwt_secret_super_seguro_123456789` |
| `NODE_ENV` | `production` |

💡 **Dica:** Gere um JWT_SECRET seguro usando: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### Passo 5: Deploy! 🎯

1. Role até o final da página
2. Clique no botão **"Create Web Service"**
3. O Render iniciará o build automaticamente
4. Aguarde 2-5 minutos para o primeiro deploy

Você verá logs como:
```
==> Installing dependencies
==> Building application
==> Starting service
🚀 Servidor rodando na porta 3001
```

### Passo 6: Obter a URL do Backend

Após o deploy bem-sucedido:

1. No topo da página, você verá a URL do seu backend:
   ```
   https://pgm-backend.onrender.com
   ```
2. **Copie essa URL** - você vai precisar dela!

### Passo 7: Testar o Backend

Abra no navegador ou use curl:

```bash
https://sua-url.onrender.com/
```

Você deve ver:
```json
{
  "mensagem": "API de Acompanhamento de Processos"
}
```

---

## 🔗 Conectar Frontend ao Backend

Agora que o backend está no ar, você precisa atualizar o frontend no Vercel.

### Opção A: Via Dashboard do Vercel (Recomendado)

1. Acesse: https://vercel.com
2. Selecione seu projeto do frontend
3. Vá em: **Settings → Environment Variables**
4. Encontre a variável `REACT_APP_API_URL`
5. Clique em **"Edit"**
6. Substitua o valor por:
   ```
   https://pgm-backend.onrender.com/api
   ```
   ⚠️ **Importante:** Use a URL do seu backend + `/api`
7. Clique em **"Save"**
8. Vá em: **Deployments** (aba superior)
9. Clique nos 3 pontos **"..."** do último deployment
10. Selecione **"Redeploy"**
11. Confirme **"Redeploy"**

### Opção B: Via Arquivo `.env` Local

Se você quiser testar localmente com o backend em produção:

No frontend (`sistema-acompanhamento-processos/frontend/.env`):
```env
REACT_APP_API_URL=https://pgm-backend.onrender.com/api
```

---

## 🔧 Configurar CORS no Backend

Para permitir que o frontend no Vercel acesse o backend no Render, você precisa configurar o CORS.

### Verificar Configuração Atual

Abra [backend/src/server.js](sistema-acompanhamento-processos/backend/src/server.js#L13) e verifique:

```javascript
app.use(cors());
```

### Atualizar para Produção (Recomendado)

Para maior segurança em produção, especifique as origens permitidas:

```javascript
const allowedOrigins = [
  'http://localhost:3000',  // Desenvolvimento local
  'https://seu-projeto.vercel.app',  // Frontend em produção
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requisições sem origin (como mobile apps ou curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS policy: origin não permitida.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
```

**Substitua** `https://seu-projeto.vercel.app` pela URL real do seu frontend no Vercel!

---

## 📊 Monitoramento e Logs

### Ver Logs em Tempo Real

1. No dashboard do Render, acesse seu serviço **`pgm-backend`**
2. Clique na aba **"Logs"**
3. Você verá todos os logs do servidor em tempo real

### Verificar Status

- **Página do Serviço**: Mostra status (Running, Build Failed, etc.)
- **Métricas**: CPU, memória, requests por minuto (planos pagos)

---

## 🔄 Deploy Automático (CI/CD)

O Render faz deploy automático sempre que você faz push na branch `main`!

```bash
git add .
git commit -m "Atualização do backend"
git push origin main
```

O Render detectará o push e iniciará um novo deploy automaticamente. 🎉

---

## ⚠️ Limitações do Plano Gratuito

| Limitação | Descrição |
|-----------|-----------|
| **Sleep após inatividade** | Após 15 min sem requests, o serviço "dorme". Primeira request leva ~30-60s para acordar |
| **750 horas/mês** | Suficiente para projetos pessoais e testes |
| **Sem backup automático** | Para SQLite, faça backups manuais periodicamente |

💡 **Dica:** Para evitar o sleep, você pode usar um serviço de ping como UptimeRobot (gratuito) para fazer requests a cada 10 minutos.

---

## 🎨 Upgrade para Plano Pago (Opcional)

Se precisar de mais recursos:

| Plano | Preço | Benefícios |
|-------|-------|-----------|
| **Free** | $0/mês | 750h/mês, sleep após inatividade |
| **Starter** | $7/mês | Sempre ativo, backups automáticos |
| **Pro** | A partir de $25/mês | Mais CPU/RAM, múltiplas instâncias |

---

## 🐛 Solução de Problemas

### Erro: "Build failed"

**Causa:** Problema nas dependências ou no build command.

**Solução:**
1. Verifique os logs de build no Render
2. Certifique-se de que `package.json` está correto
3. Teste o build localmente: `npm install && node src/server.js`

### Erro: "Application failed to respond"

**Causa:** O servidor não está escutando na porta correta ou travou.

**Solução:**
1. Verifique se a variável `PORT` está configurada
2. Veja os logs para identificar erros no código
3. Certifique-se de que `server.js` usa `process.env.PORT`

### Frontend não conecta ao backend

**Causas possíveis:**
- URL incorreta no frontend
- CORS não configurado corretamente
- Backend está em sleep (plano gratuito)

**Soluções:**
1. Verifique se `REACT_APP_API_URL` tem a URL correta + `/api`
2. Verifique configuração do CORS no backend
3. Acesse a URL do backend no navegador para "acordá-lo"
4. Veja os logs do backend para erros

### Banco de dados SQLite vazio após deploy

**Causa:** O banco não foi criado ou inicializado.

**Solução:**
1. Verifique os logs: deve aparecer "Conectado ao banco de dados SQLite"
2. O banco é criado automaticamente na primeira inicialização
3. Se necessário, faça upload manual do arquivo `.db` existente

---

## 📁 Estrutura de Arquivos (Backend)

```
sistema-acompanhamento-processos/backend/
├── src/
│   ├── server.js          # Arquivo principal
│   ├── config/
│   │   └── database.js    # Configuração SQLite
│   ├── routes/            # Rotas da API
│   ├── controllers/       # Lógica de negócio
│   ├── middleware/        # Autenticação, etc.
│   └── models/            # Modelos de dados
├── database/
│   └── processos.db       # Banco SQLite (criado automaticamente)
├── package.json
└── .env.example
```

---

## ✅ Checklist Final

- [ ] Backend deployado no Render
- [ ] URL do backend copiada
- [ ] Variáveis de ambiente configuradas (`JWT_SECRET`, `PORT`, `NODE_ENV`)
- [ ] Frontend atualizado com a nova URL do backend
- [ ] CORS configurado corretamente
- [ ] Teste de login funcionando
- [ ] Teste de criação de processo funcionando
- [ ] Deploy automático (CI/CD) ativado

---

## 🎉 Pronto!

Seu sistema está completamente online:

- **Frontend:** https://seu-projeto.vercel.app
- **Backend:** https://pgm-backend.onrender.com

### Próximos Passos (Opcional)

1. **Configurar domínio personalizado** no Vercel e Render
2. **Implementar backup do SQLite** (download periódico do arquivo `.db`)
3. **Configurar UptimeRobot** para evitar sleep do backend
4. **Adicionar logs mais detalhados** para monitoramento
5. **Implementar CI/CD com testes automatizados**

---

## 📚 Recursos Úteis

- [Documentação do Render](https://render.com/docs)
- [Render + Node.js](https://render.com/docs/deploy-node-express-app)
- [Guia de Deploy do Frontend (Vercel)](./GUIA_DEPLOY_VERCEL.md)

---

**Dúvidas?** Consulte a seção de Solução de Problemas ou os logs do Render!

Boa sorte com seu deploy! 🚀
