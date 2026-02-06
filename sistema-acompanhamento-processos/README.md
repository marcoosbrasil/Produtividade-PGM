# Sistema de Acompanhamento de Processos

Sistema completo para gerenciamento e acompanhamento de processos jurídicos/administrativos com autenticação de usuários.

---

## 🚀 INICIANTES: Comece por aqui!

**Novo no projeto?** Não sabe programação? **Leia primeiro:**

📘 **[LEIA_PRIMEIRO.md](LEIA_PRIMEIRO.md)** - Índice completo dos guias disponíveis
📘 **[COMECE_AQUI.txt](COMECE_AQUI.txt)** - Instruções super simples em texto
📘 **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** - Guia passo a passo detalhado ⭐
📘 **[GUIA_VISUAL.md](GUIA_VISUAL.md)** - Exemplos visuais do que você verá
📘 **[SOLUCAO_PROBLEMAS.md](SOLUCAO_PROBLEMAS.md)** - Resolver erros e problemas
📘 **[COMANDOS_RAPIDOS.md](COMANDOS_RAPIDOS.md)** - Referência rápida de comandos

**Atalho para Windows:** Clique 2x em **[INICIAR.bat](INICIAR.bat)** para iniciar o sistema automaticamente! ⚡

---

## Funcionalidades

- Autenticação de usuários (login e cadastro)
- Cadastro de processos com informações detalhadas
- Acompanhamento do status dos processos
- Registro de movimentações/andamentos
- Busca e filtro de processos
- Interface responsiva e intuitiva

## Tecnologias Utilizadas

### Backend
- Node.js
- Express
- SQLite (banco de dados)
- JWT (autenticação)
- Bcrypt (criptografia de senhas)

### Frontend
- React
- React Router
- Axios
- CSS3

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/sistema-acompanhamento-processos.git
cd sistema-acompanhamento-processos
```

### 2. Configurar o Backend

```bash
cd backend

# Instalar dependências
npm install

# Criar arquivo .env
cp .env.example .env
```

Edite o arquivo `.env` e configure as variáveis:

```env
PORT=3001
JWT_SECRET=seu_secret_muito_seguro_aqui_mude_em_producao
NODE_ENV=development
```

**IMPORTANTE:** Altere o `JWT_SECRET` para uma chave segura em produção!

### 3. Configurar o Frontend

```bash
cd ../frontend

# Instalar dependências
npm install
```

## Executar o Projeto

### Iniciar o Backend

```bash
cd backend
npm start
```

O servidor estará rodando em `http://localhost:3001`

Para desenvolvimento com auto-reload:
```bash
npm run dev
```

### Iniciar o Frontend

Em outro terminal:

```bash
cd frontend
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
sistema-acompanhamento-processos/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js          # Configuração do banco de dados
│   │   ├── controllers/
│   │   │   ├── authController.js    # Lógica de autenticação
│   │   │   └── processosController.js # Lógica de processos
│   │   ├── middleware/
│   │   │   └── auth.js              # Middleware de autenticação JWT
│   │   ├── routes/
│   │   │   ├── auth.js              # Rotas de autenticação
│   │   │   └── processos.js         # Rotas de processos
│   │   └── server.js                # Servidor principal
│   ├── database/                    # Banco de dados SQLite (criado automaticamente)
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProcessoForm.js      # Formulário de processo
    │   │   └── ProcessoDetalhes.js  # Detalhes e movimentações
    │   ├── contexts/
    │   │   └── AuthContext.js       # Contexto de autenticação
    │   ├── pages/
    │   │   ├── Login.js             # Tela de login/cadastro
    │   │   └── Dashboard.js         # Dashboard principal
    │   ├── services/
    │   │   └── api.js               # Configuração do Axios
    │   ├── styles/
    │   │   ├── Login.css
    │   │   └── Dashboard.css
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

## API Endpoints

### Autenticação

- `POST /api/auth/register` - Cadastrar novo usuário
  ```json
  {
    "nome": "João Silva",
    "email": "joao@email.com",
    "senha": "senha123"
  }
  ```

- `POST /api/auth/login` - Fazer login
  ```json
  {
    "email": "joao@email.com",
    "senha": "senha123"
  }
  ```

### Processos (requer autenticação)

- `GET /api/processos` - Listar todos os processos
- `GET /api/processos/:id` - Buscar processo específico
- `POST /api/processos` - Criar novo processo
- `PUT /api/processos/:id` - Atualizar processo
- `DELETE /api/processos/:id` - Deletar processo
- `POST /api/processos/:processo_id/movimentacoes` - Adicionar movimentação

## Uso da Aplicação

### 1. Primeiro Acesso

1. Acesse `http://localhost:3000`
2. Clique em "Cadastre-se"
3. Preencha seus dados (nome, email e senha)
4. Faça login com suas credenciais

### 2. Cadastrar Processo

1. No dashboard, clique em "+ Novo Processo"
2. Preencha as informações:
   - Número do processo (obrigatório)
   - Título (obrigatório)
   - Descrição
   - Status (Em andamento, Concluído, Arquivado, Suspenso)
   - Cliente
   - Data de início
3. Clique em "Salvar"

### 3. Acompanhar Processos

- Use a barra de busca para filtrar processos
- Clique em um processo para ver detalhes
- Adicione movimentações para registrar andamentos
- Edite ou delete processos conforme necessário

## Banco de Dados

O sistema usa SQLite com as seguintes tabelas:

- **usuarios**: Dados dos usuários
- **processos**: Informações dos processos
- **movimentacoes**: Histórico de andamentos

O banco é criado automaticamente na primeira execução.

## Segurança

- Senhas criptografadas com bcrypt
- Autenticação via JWT
- Tokens com validade de 24 horas
- Proteção de rotas no frontend e backend

## Melhorias Futuras

- Anexo de documentos
- Notificações de prazos
- Relatórios em PDF
- Calendário de audiências
- Sistema de permissões por usuário
- Backup automático do banco

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## Licença

MIT

## Autor

Desenvolvido para gerenciamento eficiente de processos.

## Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.
