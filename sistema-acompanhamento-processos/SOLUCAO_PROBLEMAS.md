# 🔧 Solução de Problemas Comuns

Guia completo para resolver os problemas mais comuns que podem acontecer.

---

## ❌ PROBLEMA 1: "node não é reconhecido como um comando"

### Sintoma:
Quando você digita `node --version`, aparece:
```
'node' não é reconhecido como um comando interno ou externo
```

### Causa:
O Node.js não está instalado ou não está no PATH do sistema.

### Solução:

**Passo 1:** Baixe e instale o Node.js
1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (botão verde)
3. Execute o instalador
4. **IMPORTANTE:** Marque a opção "Automatically install the necessary tools"
5. Clique em "Next" até finalizar

**Passo 2:** Reinicie o computador (obrigatório!)

**Passo 3:** Teste novamente
```bash
node --version
```

✅ Deve aparecer: `v18.17.0` ou similar

---

## ❌ PROBLEMA 2: "npm install" demora muito ou trava

### Sintoma:
O comando `npm install` fica travado ou demora mais de 10 minutos.

### Causas possíveis:
- Conexão lenta com a internet
- Antivírus bloqueando
- Cache do npm corrompido

### Soluções:

**Solução A - Limpar cache do npm:**
```bash
npm cache clean --force
npm install
```

**Solução B - Desabilitar temporariamente o antivírus:**
1. Desative o antivírus por 10 minutos
2. Execute `npm install` novamente
3. Reative o antivírus

**Solução C - Usar outro registro npm:**
```bash
npm install --registry=https://registry.npmjs.org/
```

---

## ❌ PROBLEMA 3: Erro "EACCES" ou "permission denied"

### Sintoma:
```
Error: EACCES: permission denied
```

### Causa:
Falta de permissão para escrever na pasta.

### Solução (Windows):

**Opção 1 - Execute como Administrador:**
1. Clique com botão direito no Prompt de Comando
2. Escolha "Executar como administrador"
3. Navegue até a pasta do projeto
4. Execute `npm install` novamente

**Opção 2 - Altere as permissões da pasta:**
1. Clique com botão direito na pasta do projeto
2. Propriedades → Segurança → Editar
3. Dê permissão total ao seu usuário
4. Aplique e tente novamente

---

## ❌ PROBLEMA 4: Erro "porta 3001 já está em uso"

### Sintoma:
```
Error: listen EADDRINUSE: address already in use :::3001
```

### Causa:
Já existe outro programa usando a porta 3001.

### Soluções:

**Solução A - Fechar o processo que está usando a porta:**

1. Descubra qual processo está usando:
```bash
netstat -ano | findstr :3001
```

2. Você verá algo como:
```
TCP    0.0.0.0:3001    0.0.0.0:0    LISTENING    12345
```

3. Mate o processo (substitua 12345 pelo número que apareceu):
```bash
taskkill /PID 12345 /F
```

**Solução B - Alterar a porta do backend:**

1. Abra o arquivo: `backend\.env`
2. Altere a linha:
```
PORT=3001
```
Para:
```
PORT=3002
```
3. Salve o arquivo
4. Reinicie o backend

**IMPORTANTE:** Se mudar a porta do backend, você também precisa:
- Editar `frontend\src\services\api.js`
- Mudar `http://localhost:3001` para `http://localhost:3002`

---

## ❌ PROBLEMA 5: Erro "porta 3000 já está em uso"

### Sintoma:
```
? Something is already running on port 3000. Would you like to run the app on another port instead? (Y/n)
```

### Solução:
Isso é comum e **fácil de resolver**:

1. Digite `Y` (sim)
2. Aperte Enter
3. O sistema usará a porta 3001, 3002, etc.
4. O navegador abrirá automaticamente na porta correta

✅ **Não precisa fazer mais nada!**

---

## ❌ PROBLEMA 6: Página em branco ou "Cannot GET /"

### Sintomas:
- Navegador mostra página em branco
- Aparece "Cannot GET /"
- Aparece erro 404

### Causas:
- Backend não está rodando
- Frontend não está rodando
- URL errada

### Soluções:

**Passo 1:** Verifique se o backend está rodando
- Olhe a janela do terminal do backend
- Deve mostrar: "Servidor rodando na porta 3001"
- Se não estiver rodando, execute: `npm start` na pasta backend

**Passo 2:** Verifique se o frontend está rodando
- Olhe a janela do terminal do frontend
- Deve mostrar: "webpack compiled successfully"
- Se não estiver rodando, execute: `npm start` na pasta frontend

**Passo 3:** Acesse a URL correta
- URL certa: `http://localhost:3000`
- Não use: `http://127.0.0.1` ou outras variações

**Passo 4:** Limpe o cache do navegador
1. Pressione: `Ctrl + Shift + Del`
2. Marque "Imagens e arquivos em cache"
3. Clique em "Limpar dados"
4. Atualize a página (F5)

---

## ❌ PROBLEMA 7: Erro ao fazer login - "Credenciais inválidas"

### Sintomas:
- Você faz login mas aparece erro
- Mensagem: "Credenciais inválidas"

### Causas:
- Email ou senha incorretos
- Usuário não foi cadastrado corretamente
- Backend não está conectado ao banco

### Soluções:

**Solução A - Verifique os dados:**
1. Confirme que o email está correto
2. Confirme que a senha está correta
3. A senha tem pelo menos 6 caracteres?

**Solução B - Cadastre novamente:**
1. Clique em "Cadastre-se"
2. Use um email diferente
3. Crie a conta novamente

**Solução C - Verifique o backend:**
1. Olhe a janela do terminal do backend
2. Procure por erros em vermelho
3. Se tiver erro, reinicie o backend (Ctrl+C e depois npm start)

---

## ❌ PROBLEMA 8: Banco de dados não foi criado

### Sintoma:
Erro ao iniciar o backend:
```
Error: SQLITE_CANTOPEN: unable to open database file
```

### Causa:
Pasta do banco de dados não existe.

### Solução:

**Passo 1:** Crie a pasta manualmente
```bash
cd backend
mkdir database
```

**Passo 2:** Reinicie o backend
```bash
npm start
```

✅ O arquivo `processos.db` será criado automaticamente

---

## ❌ PROBLEMA 9: "Module not found" ou erros de dependências

### Sintomas:
```
Error: Cannot find module 'express'
Module not found: Can't resolve 'react'
```

### Causa:
Dependências não foram instaladas ou instalação falhou.

### Solução:

**Passo 1:** Delete a pasta node_modules
```bash
rd /s /q node_modules
```

**Passo 2:** Delete o arquivo package-lock.json (se existir)
```bash
del package-lock.json
```

**Passo 3:** Instale novamente
```bash
npm install
```

**Faça isso tanto no backend quanto no frontend!**

---

## ❌ PROBLEMA 10: Alterações não aparecem

### Sintoma:
Você altera algo no código mas não vê mudança no navegador.

### Solução:

**Para o Frontend:**
1. O React tem auto-reload, mas às vezes falha
2. Pare o servidor (Ctrl+C)
3. Inicie novamente: `npm start`
4. Ou simplesmente atualize o navegador (Ctrl+F5)

**Para o Backend:**
1. O backend NÃO tem auto-reload por padrão
2. Você precisa parar (Ctrl+C) e iniciar novamente
3. Ou use: `npm run dev` (se tiver nodemon instalado)

---

## ❌ PROBLEMA 11: "Network Error" ao tentar cadastrar processo

### Sintoma:
Ao tentar salvar um processo, aparece: "Network Error"

### Causas:
- Backend não está rodando
- Firewall bloqueando
- CORS bloqueado

### Soluções:

**Solução A:** Verifique se o backend está rodando
```
Terminal do backend deve mostrar: "Servidor rodando na porta 3001"
```

**Solução B:** Teste se a API está acessível
1. Abra o navegador
2. Acesse: `http://localhost:3001`
3. Deve aparecer: `{"mensagem":"API de Acompanhamento de Processos"}`

**Solução C:** Verifique o arquivo api.js
1. Abra: `frontend\src\services\api.js`
2. Confirme que a URL é: `http://localhost:3001/api`
3. Se mudou a porta do backend, altere aqui também

---

## ❌ PROBLEMA 12: Tela de login aparece mas não consigo digitar

### Sintoma:
Os campos de texto não funcionam ou não consigo clicar.

### Causa:
Problema de CSS ou JavaScript não carregou.

### Solução:

**Passo 1:** Verifique o console do navegador
1. Pressione F12
2. Clique na aba "Console"
3. Procure por erros em vermelho

**Passo 2:** Limpe cache e atualize
1. Pressione Ctrl+Shift+Del
2. Limpe cache
3. Feche e abra o navegador novamente
4. Acesse http://localhost:3000

**Passo 3:** Teste em outro navegador
- Se funcionar em outro navegador, o problema é no primeiro
- Atualize ou reinstale o navegador com problema

---

## 🆘 Ainda com problemas?

Se nenhuma solução acima funcionou:

### Solução DEFINITIVA - Reinstalar tudo do zero:

**Passo 1:** Delete as pastas node_modules
```bash
cd backend
rd /s /q node_modules
cd ..\frontend
rd /s /q node_modules
```

**Passo 2:** Delete o banco de dados
```bash
cd ..\backend\database
del processos.db
```

**Passo 3:** Reinstale tudo
```bash
cd ..\..
cd backend
npm install
cd ..\frontend
npm install
```

**Passo 4:** Inicie novamente
```bash
cd ..\backend
npm start
```
(Em outro terminal)
```bash
cd frontend
npm start
```

---

## 📞 Precisa de ajuda adicional?

Se ainda tiver problemas:

1. ✅ **Anote** a mensagem de erro completa
2. ✅ **Tire print** da tela do terminal
3. ✅ **Informe** qual passo você estava fazendo
4. ✅ **Descreva** o que aconteceu

Com essas informações, fica muito mais fácil ajudar você!

---

## 💡 Dicas para evitar problemas:

1. **Sempre** inicie o backend ANTES do frontend
2. **Nunca** feche os terminais enquanto estiver usando o sistema
3. **Mantenha** as duas janelas abertas
4. **Use** Ctrl+C para parar, não apenas feche a janela
5. **Aguarde** a mensagem de sucesso antes de usar
6. **Não mude** os arquivos enquanto o sistema estiver rodando

---

## ✅ Checklist de Verificação

Antes de pedir ajuda, verifique:

- [ ] Node.js está instalado? (node --version)
- [ ] Executei npm install no backend?
- [ ] Executei npm install no frontend?
- [ ] O backend está rodando? (mensagem "Servidor rodando")
- [ ] O frontend está rodando? (mensagem "webpack compiled")
- [ ] Estou acessando http://localhost:3000 ?
- [ ] Ambas janelas estão abertas?
- [ ] Não tem nenhum erro vermelho nos terminais?

Se todas as respostas forem SIM ✅, o sistema deveria funcionar!
