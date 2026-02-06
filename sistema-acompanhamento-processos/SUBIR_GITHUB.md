# Como subir o projeto para o GitHub

## Passo 1: Criar repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique no botão "+" no canto superior direito
3. Selecione "New repository"
4. Preencha:
   - Repository name: `sistema-acompanhamento-processos`
   - Description: "Sistema para acompanhamento de processos com login e senha"
   - Deixe como **Public** ou **Private** (sua escolha)
   - **NÃO** marque "Initialize this repository with a README"
5. Clique em "Create repository"

## Passo 2: Inicializar Git local

Abra o terminal na pasta do projeto e execute:

```bash
cd sistema-acompanhamento-processos
git init
git add .
git commit -m "Initial commit: Sistema de acompanhamento de processos"
```

## Passo 3: Conectar ao GitHub

Substitua `SEU-USUARIO` pelo seu usuário do GitHub:

```bash
git remote add origin https://github.com/SEU-USUARIO/sistema-acompanhamento-processos.git
git branch -M main
git push -u origin main
```

## Passo 4: Atualizar o README (opcional)

Depois de subir, você pode editar o README.md diretamente no GitHub para adicionar:
- Link do repositório
- Badges
- Screenshots da aplicação

## Comandos para atualizar o repositório

Após fazer alterações no código:

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

## Dicas importantes

1. O arquivo `.gitignore` já está configurado para não subir:
   - node_modules
   - .env (variáveis de ambiente)
   - Banco de dados
   - Arquivos de build

2. **NUNCA** suba o arquivo `.env` com dados sensíveis para o GitHub

3. O arquivo `.env.example` serve como modelo para outros desenvolvedores

4. Considere adicionar badges ao README:
   - Status do projeto
   - Licença
   - Versão do Node.js

## Exemplo de descrição para o repositório

```
Sistema completo de acompanhamento de processos jurídicos/administrativos com:
- Autenticação JWT
- Cadastro de processos
- Registro de movimentações
- Interface responsiva em React
- Backend Node.js + Express + SQLite
```

## Colaboração

Para permitir que outros contribuam:

1. Aceite Pull Requests
2. Configure branch protection rules
3. Adicione CONTRIBUTING.md com regras de contribuição

## GitHub Pages (opcional)

Para hospedar o frontend gratuitamente:

1. No repositório, vá em Settings > Pages
2. Selecione branch `main` e pasta `/frontend/build`
3. Configure a variável de ambiente da API para o backend em produção
