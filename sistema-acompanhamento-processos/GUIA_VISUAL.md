# 📸 Guia Visual - O que você verá em cada etapa

Este guia mostra **exatamente** o que aparecerá na sua tela em cada passo.

---

## 🖥️ PASSO 1: Verificar se o Node.js está instalado

### O que fazer:
1. Abra o Prompt de Comando
2. Digite: `node --version`
3. Aperte Enter

### O que você verá:

✅ **Se estiver instalado:**
```
C:\Users\marcos.santos>node --version
v18.17.0
```

❌ **Se NÃO estiver instalado:**
```
'node' não é reconhecido como um comando interno ou externo
```

**Se aparecer o erro**, baixe o Node.js em: https://nodejs.org/

---

## 📦 PASSO 2: Instalar dependências do BACKEND

### O que fazer:
```bash
cd backend
npm install
```

### O que você verá:

```
C:\...\sistema-acompanhamento-processos>cd backend

C:\...\sistema-acompanhamento-processos\backend>npm install

npm WARN deprecated ...
npm WARN deprecated ...

added 150 packages, and audited 151 packages in 45s

12 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

C:\...\sistema-acompanhamento-processos\backend>
```

⏳ **Tempo estimado:** 1-3 minutos
✅ **Pronto quando:** Aparecer "added X packages" e o cursor voltar a piscar

---

## 📦 PASSO 3: Instalar dependências do FRONTEND

### O que fazer:
```bash
cd ..
cd frontend
npm install
```

### O que você verá:

```
C:\...\sistema-acompanhamento-processos\backend>cd ..

C:\...\sistema-acompanhamento-processos>cd frontend

C:\...\sistema-acompanhamento-processos\frontend>npm install

npm WARN deprecated ...

added 1478 packages, and audited 1479 packages in 1m

238 packages are looking for funding
  run `npm fund` for details

8 vulnerabilities (2 moderate, 6 high)

C:\...\sistema-acompanhamento-processos\frontend>
```

⏳ **Tempo estimado:** 1-3 minutos
✅ **Pronto quando:** Aparecer "added X packages" e o cursor voltar a piscar

⚠️ **Nota:** As "vulnerabilities" são normais em projetos de desenvolvimento local

---

## 🚀 PASSO 4: Iniciar o BACKEND

### O que fazer:
```bash
cd backend
npm start
```

### O que você verá:

```
C:\...\sistema-acompanhamento-processos\backend>npm start

> backend-acompanhamento-processos@1.0.0 start
> node src/server.js

Conectado ao banco de dados SQLite.
Servidor rodando na porta 3001
```

✅ **SUCESSO!** Deixe esta janela aberta!

---

## 🚀 PASSO 5: Iniciar o FRONTEND

### O que fazer (em OUTRA janela):
```bash
cd frontend
npm start
```

### O que você verá:

```
C:\...\sistema-acompanhamento-processos\frontend>npm start

> frontend-acompanhamento-processos@1.0.0 start
> react-scripts start

Starting the development server...

Compiled successfully!

You can now view frontend-acompanhamento-processos in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.100:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

✅ **SUCESSO!** O navegador abrirá automaticamente!

---

## 🌐 PASSO 6: Tela de Login (Primeira tela)

### O que você verá no navegador:

```
┌─────────────────────────────────────────┐
│                                         │
│              Login                      │
│   Sistema de Acompanhamento            │
│         de Processos                    │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ Email                           │  │
│   │ seu@email.com                   │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ Senha                           │  │
│   │ ••••••••                        │  │
│   └─────────────────────────────────┘  │
│                                         │
│        [ Entrar ]                       │
│                                         │
│   Não tem uma conta? Cadastre-se       │
│                                         │
└─────────────────────────────────────────┘
```

✅ Clique em **"Cadastre-se"** para criar sua conta

---

## 📝 PASSO 7: Tela de Cadastro

### O que você verá ao clicar em "Cadastre-se":

```
┌─────────────────────────────────────────┐
│                                         │
│            Cadastro                     │
│   Sistema de Acompanhamento            │
│         de Processos                    │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ Nome Completo                   │  │
│   │ Digite seu nome                 │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ Email                           │  │
│   │ seu@email.com                   │  │
│   └─────────────────────────────────┘  │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ Senha                           │  │
│   │ Digite sua senha                │  │
│   └─────────────────────────────────┘  │
│                                         │
│        [ Cadastrar ]                    │
│                                         │
│   Já tem uma conta? Faça login         │
│                                         │
└─────────────────────────────────────────┘
```

### Preencha:
- **Nome:** Seu nome completo
- **Email:** exemplo@email.com
- **Senha:** mínimo 6 caracteres

### Após clicar em "Cadastrar":

Aparecerá um alerta:
```
✓ Cadastro realizado com sucesso! Faça login para continuar.
```

---

## 🏠 PASSO 8: Dashboard (Tela Principal)

### O que você verá após fazer login:

```
┌────────────────────────────────────────────────────────────────┐
│ Acompanhamento de Processos         Bem-vindo, [Seu Nome] [Sair]│
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Processos                           [+ Novo Processo]         │
│  ┌──────────────────────────────────────────────────────┐     │
│  │ Buscar por número, título ou cliente...             │     │
│  └──────────────────────────────────────────────────────┘     │
│                                                                 │
│  Nenhum processo cadastrado.                                   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## ➕ PASSO 9: Criar Novo Processo

### O que você verá ao clicar em "+ Novo Processo":

```
┌──────────────────────────────────────────────────┐
│ Novo Processo                                     │
├──────────────────────────────────────────────────┤
│                                                   │
│ Número do Processo *                              │
│ ┌────────────────────────────────────────┐       │
│ │ Ex: 0001234-56.2024.8.00.0000          │       │
│ └────────────────────────────────────────┘       │
│                                                   │
│ Status                                            │
│ ┌────────────────────────────────────────┐       │
│ │ Em andamento ▼                         │       │
│ └────────────────────────────────────────┘       │
│                                                   │
│ Título *                                          │
│ ┌────────────────────────────────────────┐       │
│ │ Ex: Ação de Cobrança                   │       │
│ └────────────────────────────────────────┘       │
│                                                   │
│ Descrição                                         │
│ ┌────────────────────────────────────────┐       │
│ │ Descrição detalhada do processo...     │       │
│ │                                        │       │
│ └────────────────────────────────────────┘       │
│                                                   │
│ Cliente              Data de Início              │
│ ┌─────────────────┐  ┌─────────────────┐        │
│ │ Nome do cliente │  │ 06/02/2024      │        │
│ └─────────────────┘  └─────────────────┘        │
│                                                   │
│  [ Cancelar ]               [ Salvar ]           │
│                                                   │
└──────────────────────────────────────────────────┘
```

### Exemplo de preenchimento:
- **Número:** 0001234-56.2024.8.00.0000
- **Título:** Ação de Cobrança
- **Descrição:** Cobrança de valores não pagos pelo réu
- **Status:** Em andamento
- **Cliente:** João Silva
- **Data de início:** 06/02/2024

---

## 📊 PASSO 10: Lista de Processos

### O que você verá após criar processos:

```
┌─────────────────────────────────────────────────────┐
│ Processos                      [+ Novo Processo]    │
├─────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────┐         │
│ │ Buscar...                              │         │
│ └────────────────────────────────────────┘         │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ 0001234-56.2024.8.00.0000  [Em andamento]  │   │
│ │ Ação de Cobrança                            │   │
│ │ Cliente: João Silva                         │   │
│ │ Atualizado em: 06/02/2024 14:30            │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
│ ┌─────────────────────────────────────────────┐   │
│ │ 0005678-90.2024.8.00.0000  [Concluído]     │   │
│ │ Ação Trabalhista                            │   │
│ │ Cliente: Maria Santos                       │   │
│ │ Atualizado em: 05/02/2024 10:15            │   │
│ └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

✅ Clique em qualquer processo para ver detalhes

---

## 🔍 PASSO 11: Detalhes do Processo

### O que você verá ao clicar em um processo:

```
┌──────────────────────────────────────────┐
│ Detalhes do Processo              [×]    │
├──────────────────────────────────────────┤
│                                          │
│ Número do Processo:                      │
│ 0001234-56.2024.8.00.0000               │
│                                          │
│ Título:                                  │
│ Ação de Cobrança                        │
│                                          │
│ Status:                                  │
│ Em andamento                            │
│                                          │
│ Cliente:                                 │
│ João Silva                              │
│                                          │
│ ─────── Movimentações ───────           │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Adicionar nova movimentação...     │  │
│ │                                    │  │
│ └────────────────────────────────────┘  │
│        [Adicionar Movimentação]         │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ Processo iniciado                   │  │
│ │ 06/02/2024 14:30                   │  │
│ └────────────────────────────────────┘  │
│                                          │
│ ────────────────────────────────────    │
│                                          │
│  [ Editar ]          [ Deletar ]        │
│                                          │
└──────────────────────────────────────────┘
```

---

## 🛑 Como PARAR o sistema

### Nas janelas do Prompt de Comando:

1. **Clique na janela do terminal**
2. **Pressione:** `Ctrl + C`
3. **Você verá:**

```
Encerrar o trabalho em lotes (S/N)? _
```

4. **Digite:** `S` (Sim)
5. **Aperte:** Enter

✅ O servidor será parado e você pode fechar a janela

---

## 🎯 Dica: Use o arquivo INICIAR.bat

Para facilitar nas próximas vezes:

1. **Clique duas vezes** no arquivo `INICIAR.bat`
2. Duas janelas abrirão automaticamente
3. Aguarde o navegador abrir
4. Pronto! 🎉

---

## ✅ Resumo Rápido

1. Instale o Node.js
2. Execute `npm install` no backend
3. Execute `npm install` no frontend
4. Execute `npm start` no backend (janela 1)
5. Execute `npm start` no frontend (janela 2)
6. Acesse http://localhost:3000
7. Cadastre-se e comece a usar!

**Dúvidas?** Releia este guia ou consulte o arquivo `INICIO_RAPIDO.md`