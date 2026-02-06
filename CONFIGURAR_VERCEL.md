# 🔗 Conectar Frontend (Vercel) ao Backend (Render)

## 📋 Informações das URLs

- **Frontend:** https://produtividade-pgm.vercel.app/
- **Backend:** https://produtividade-pgm.onrender.com/api

---

## ⚙️ Configurar Variável de Ambiente no Vercel

### Passo 1: Acessar o Dashboard do Vercel

1. Acesse: https://vercel.com
2. Faça login
3. Clique no projeto: **`produtividade-pgm`**

### Passo 2: Ir para Settings

1. No menu superior, clique em **"Settings"**

### Passo 3: Configurar Environment Variables

1. No menu lateral esquerdo, clique em **"Environment Variables"**
2. Você verá a variável `REACT_APP_API_URL` já existente
3. Clique no ícone de **"Edit"** (lápis) ao lado dela

### Passo 4: Atualizar o Valor

1. No campo **"Value"**, apague o valor antigo
2. Digite exatamente:
   ```
   https://produtividade-pgm.onrender.com/api
   ```
3. Certifique-se de que está marcado para **"Production"**, **"Preview"** e **"Development"**
4. Clique em **"Save"**

### Passo 5: Fazer Redeploy

Após salvar a variável:

1. Vá para a aba **"Deployments"** (no menu superior)
2. Encontre o último deployment (o primeiro da lista)
3. Clique nos **3 pontos "..."** à direita
4. Selecione **"Redeploy"**
5. **IMPORTANTE:** Marque a opção **"Use existing Build Cache"** (opcional, mas mais rápido)
6. Clique em **"Redeploy"**

### Passo 6: Aguardar o Deploy

- O processo leva cerca de 1-2 minutos
- Você verá o status: **"Building"** → **"Ready"**
- Quando aparecer **"Ready"**, está pronto!

---

## 🧪 Testar a Conexão

### 1. Testar o Backend Diretamente

Abra no navegador:
```
https://produtividade-pgm.onrender.com/
```

Deve retornar:
```json
{
  "mensagem": "API de Acompanhamento de Processos"
}
```

### 2. Testar o Frontend

1. Acesse: https://produtividade-pgm.vercel.app/
2. Tente fazer **login** (ou criar uma conta se ainda não tem)
3. Se conseguir fazer login, a conexão está funcionando! ✅

---

## 🔧 Se Aparecer Erro de CORS

Se ao tentar fazer login aparecer um erro de CORS no console do navegador, faça o seguinte:

### Verificar se o Backend Foi Atualizado

O backend já foi configurado para permitir o frontend do Vercel. Verifique se o último commit foi deployado no Render:

1. Acesse: https://dashboard.render.com
2. Clique no serviço **`pgm-backend`**
3. Verifique se o último deploy foi o commit: **"Corrige erro de permissão do SQLite no Render"**
4. Se não foi, faça um **"Manual Deploy"** → **"Deploy latest commit"**

---

## ✅ Checklist Final

- [ ] Backend deployado no Render e funcionando
- [ ] Frontend deployado no Vercel
- [ ] Variável `REACT_APP_API_URL` configurada no Vercel com: `https://produtividade-pgm.onrender.com/api`
- [ ] Redeploy do frontend realizado
- [ ] Teste de acesso ao backend direto funcionando
- [ ] Teste de login no frontend funcionando

---

## 🎉 Pronto!

Seu sistema está completamente integrado e funcionando:

- ✅ Frontend hospedado no Vercel
- ✅ Backend hospedado no Render
- ✅ Conexão configurada entre os dois
- ✅ CORS configurado corretamente

---

## 📝 Observações Importantes

### Sobre o Plano Gratuito do Render

⚠️ O backend no plano gratuito do Render **"dorme" após 15 minutos de inatividade**.

**Sintomas:**
- Primeira requisição após inatividade leva 30-60 segundos
- O usuário pode ver "Loading..." por mais tempo

**Soluções:**
1. **Aceitar o comportamento** (adequado para projetos pessoais/testes)
2. **Usar um serviço de ping** como [UptimeRobot](https://uptimerobot.com/) (gratuito) para fazer requests a cada 10 minutos
3. **Upgrade para plano pago** do Render ($7/mês - sempre ativo)

### Desenvolvendo Localmente

Se você quiser rodar o frontend localmente mas usar o backend em produção:

1. O arquivo `.env` já está configurado com a URL do Render
2. Basta rodar: `npm start` na pasta do frontend
3. Acesse: http://localhost:3000

Para voltar a usar o backend local:
1. Edite o arquivo `.env` do frontend
2. Troque para: `REACT_APP_API_URL=http://localhost:3001/api`
3. Rode o backend localmente

---

**Dúvidas?** Consulte os guias:
- [GUIA_DEPLOY_BACKEND_RENDER.md](./GUIA_DEPLOY_BACKEND_RENDER.md)
- [GUIA_DEPLOY_VERCEL.md](./GUIA_DEPLOY_VERCEL.md)
