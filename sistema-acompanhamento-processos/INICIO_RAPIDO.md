# 🚀 Guia Completo Para Iniciantes - Passo a Passo

Este guia foi feito para quem **não tem experiência com programação**. Vou explicar cada passo detalhadamente.

## 📋 PASSO 0: Pré-requisitos (Instalar o Node.js)

Antes de tudo, você precisa ter o Node.js instalado no seu computador.

### Como instalar o Node.js:

1. **Acesse:** https://nodejs.org/
2. **Baixe** a versão **LTS** (recomendada)
3. **Execute** o instalador baixado
4. **Clique** em "Next" até finalizar (aceite as opções padrão)
5. **Reinicie** o computador após a instalação

### Como verificar se o Node.js foi instalado:

1. Abra o **Prompt de Comando** (ou Terminal)
   - **Windows:** Pressione `Win + R`, digite `cmd` e aperte Enter
   - **Mac:** Pressione `Cmd + Espaço`, digite `terminal` e aperte Enter

2. Digite o seguinte comando e aperte Enter:
   ```bash
   node --version
   ```

3. Se aparecer algo como `v18.17.0` ou similar, está instalado corretamente! ✅

---

## 📂 PASSO 1: Navegar até a pasta do projeto

Você precisa abrir o terminal/prompt na pasta onde está o projeto.

### Opção A - Método mais fácil (Windows):

1. Abra o **Explorador de Arquivos**
2. Navegue até a pasta: `C:\Users\marcos.santos\OneDrive\Documentos\Marcos\Produtividade PGM\sistema-acompanhamento-processos`
3. Clique na **barra de endereço** (onde mostra o caminho)
4. Digite `cmd` e aperte **Enter**
5. Uma janela preta (Prompt de Comando) vai abrir já na pasta correta! ✅

### Opção B - Via comando:

1. Abra o Prompt de Comando
2. Digite o seguinte comando e aperte Enter:
   ```bash
   cd "C:\Users\marcos.santos\OneDrive\Documentos\Marcos\Produtividade PGM\sistema-acompanhamento-processos"
   ```

---

## 📦 PASSO 2: Instalar as dependências (bibliotecas necessárias)

Agora vamos instalar tudo que o projeto precisa para funcionar.

### 2.1 - Instalar dependências do BACKEND:

No terminal/prompt que você abriu, digite cada comando abaixo e aperte Enter após cada um:

```bash
cd backend
```
*Este comando entra na pasta do backend*

```bash
npm install
```
*Este comando instala todas as bibliotecas do backend*

⏳ **Aguarde:** Pode demorar de 1 a 3 minutos. Você verá várias linhas aparecendo. É normal!

✅ **Quando terminar:** Você verá algo como "added 150 packages" e o cursor voltará a piscar.

---

### 2.2 - Instalar dependências do FRONTEND:

Agora vamos voltar uma pasta e entrar no frontend:

```bash
cd ..
```
*Este comando volta para a pasta principal*

```bash
cd frontend
```
*Este comando entra na pasta do frontend*

```bash
npm install
```
*Este comando instala todas as bibliotecas do frontend*

⏳ **Aguarde:** Também vai demorar de 1 a 3 minutos.

✅ **Quando terminar:** Verá mensagens de pacotes instalados e o cursor voltará a piscar.

---

## 🚀 PASSO 3: Iniciar o sistema (Backend + Frontend)

Para o sistema funcionar, você precisa iniciar **DOIS** programas ao mesmo tempo:
- O **Backend** (servidor que gerencia os dados)
- O **Frontend** (a interface visual que você vai usar)

Você vai precisar de **DUAS janelas** de terminal/prompt abertas.

### 3.1 - Iniciar o BACKEND (Terminal 1):

1. **Abra um novo Prompt de Comando** (primeira janela)
   - Pressione `Win + R`, digite `cmd` e aperte Enter

2. **Navegue até a pasta do backend:**
   ```bash
   cd "C:\Users\marcos.santos\OneDrive\Documentos\Marcos\Produtividade PGM\sistema-acompanhamento-processos\backend"
   ```

3. **Inicie o backend:**
   ```bash
   npm start
   ```

4. **✅ Está funcionando quando aparecer:**
   ```
   Conectado ao banco de dados SQLite.
   Servidor rodando na porta 3001
   ```

⚠️ **IMPORTANTE:** **NÃO FECHE** esta janela! Ela precisa ficar aberta enquanto você usa o sistema.

---

### 3.2 - Iniciar o FRONTEND (Terminal 2):

1. **Abra OUTRO Prompt de Comando** (segunda janela)
   - Pressione `Win + R`, digite `cmd` e aperte Enter novamente

2. **Navegue até a pasta do frontend:**
   ```bash
   cd "C:\Users\marcos.santos\OneDrive\Documentos\Marcos\Produtividade PGM\sistema-acompanhamento-processos\frontend"
   ```

3. **Inicie o frontend:**
   ```bash
   npm start
   ```

4. **✅ O navegador abrirá automaticamente** em: `http://localhost:3000`
   - Se não abrir sozinho, abra o navegador e digite: `http://localhost:3000`

5. **Você verá a tela de LOGIN do sistema!** 🎉

⚠️ **IMPORTANTE:** **NÃO FECHE** esta janela também! Mantenha as duas abertas.

---

## 🎯 PASSO 4: Usar o sistema pela primeira vez

### 4.1 - Criar sua conta:

1. Na tela de login, clique em **"Cadastre-se"**
2. Preencha os dados:
   - **Nome:** Seu nome completo
   - **Email:** seu@email.com
   - **Senha:** mínimo 6 caracteres
3. Clique em **"Cadastrar"**
4. Aparecerá uma mensagem de sucesso!

### 4.2 - Fazer login:

1. Clique em **"Faça login"**
2. Digite seu email e senha
3. Clique em **"Entrar"**
4. Você entrará no **Dashboard** (tela principal)! 🎉

### 4.3 - Cadastrar seu primeiro processo:

1. Clique no botão **"+ Novo Processo"**
2. Preencha os campos:
   - **Número do processo:** Ex: 0001234-56.2024.8.00.0000
   - **Título:** Ex: Ação de Cobrança
   - **Descrição:** Descrição do processo
   - **Status:** Escolha uma opção (Em andamento, Concluído, etc)
   - **Cliente:** Nome do cliente
   - **Data de início:** Escolha uma data
3. Clique em **"Salvar"**

### 4.4 - Ver detalhes e adicionar movimentações:

1. **Clique** em qualquer processo da lista
2. O painel lateral abrirá com os detalhes
3. Role para baixo e adicione movimentações no campo de texto
4. Clique em **"Adicionar Movimentação"**

---

## 🛑 Como PARAR o sistema

Quando quiser parar o sistema:

1. Vá nas duas janelas do Prompt de Comando
2. Pressione **Ctrl + C** em cada uma
3. Confirme com **S** (Sim) se perguntar
4. Agora pode fechar as janelas

---

## ⚡ Atalho Rápido (para as próximas vezes)

Criei scripts para facilitar! Nas próximas vezes:

1. **Opção 1 - Instalar dependências:**
   - Clique duas vezes no arquivo `instalar.bat`

2. **Opção 2 - Iniciar o sistema:**
   - Abra dois Prompts de Comando
   - No primeiro: navegue até `backend` e rode `npm start`
   - No segundo: navegue até `frontend` e rode `npm start`

---

## ❓ Problemas Comuns e Soluções

### ❌ Erro: "npm não é reconhecido"

**Solução:** Node.js não está instalado ou não está no PATH
- Reinstale o Node.js
- Marque a opção "Add to PATH" na instalação

### ❌ Erro: "porta 3001 já está em uso"

**Solução:** Já tem algo rodando nessa porta
- Feche outros programas que possam estar usando
- Ou altere a porta no arquivo `backend\.env`

### ❌ Erro: "porta 3000 já está em uso"

**Solução:** O terminal perguntará se quer usar outra porta
- Digite `Y` (sim) e aperte Enter

### ❌ A página não carrega / fica em branco

**Solução:**
1. Verifique se o backend está rodando (terminal 1)
2. Verifique se o frontend está rodando (terminal 2)
3. Tente atualizar a página (F5)
4. Limpe o cache do navegador (Ctrl + Shift + Del)

### ❌ Erro ao fazer login

**Solução:**
- Verifique se o backend está rodando
- Tente cadastrar novamente
- Verifique se a senha tem pelo menos 6 caracteres

---

## 📞 Precisa de ajuda?

Se tiver qualquer problema que não conseguiu resolver com este guia:

1. Anote a mensagem de erro que aparece
2. Tire uma captura de tela do terminal
3. Entre em contato informando o problema

---

## ✅ Checklist Final

- [ ] Node.js instalado e funcionando
- [ ] Dependências do backend instaladas
- [ ] Dependências do frontend instaladas
- [ ] Backend rodando (terminal 1 aberto)
- [ ] Frontend rodando (terminal 2 aberto)
- [ ] Consegui acessar http://localhost:3000
- [ ] Conta criada com sucesso
- [ ] Login funcionando
- [ ] Primeiro processo cadastrado

**Se marcou todos ✅, parabéns! O sistema está funcionando perfeitamente!** 🎉
