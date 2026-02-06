# Como Criar um Usuário Administrador

## Método 1: Script Interativo (Recomendado)

Execute o seguinte comando no terminal a partir da pasta `backend`:

```bash
node src/scripts/criarAdmin.js
```

O script irá solicitar:
- Nome completo
- Email
- Senha (mínimo 6 caracteres)

O usuário será criado automaticamente como administrador.

## Método 2: Via SQLite

Se preferir criar manualmente, execute os seguintes comandos SQL:

```bash
# Acesse o banco de dados
cd backend/database
sqlite3 processos.db
```

```sql
-- Crie o hash da senha usando bcrypt (você precisa gerar isso separadamente)
-- Para a senha "admin123", o hash bcrypt seria algo como:
-- $2a$10$exemplo...

INSERT INTO usuarios (nome, email, senha, is_admin)
VALUES (
  'Administrador',
  'admin@pgm.com',
  '$2a$10$SEU_HASH_BCRYPT_AQUI',
  1
);

-- Verificar se foi criado
SELECT id, nome, email, is_admin FROM usuarios WHERE is_admin = 1;
```

## Método 3: Atualizar Usuário Existente

Se você já tem um usuário cadastrado e quer torná-lo admin:

```sql
UPDATE usuarios SET is_admin = 1 WHERE email = 'seu@email.com';
```

## Funcionalidades do Admin

Após criar o administrador, você poderá:

1. **Acessar o Painel Admin**: Botão "Painel Admin" aparecerá no Dashboard
2. **Gerenciar Usuários**: Ver lista de todos os usuários
3. **Atribuir Células**: Definir quais células cada usuário pode acessar
4. **Promover/Remover Admin**: Alterar status de administrador de outros usuários

## Células Disponíveis

As seguintes células foram criadas automaticamente no sistema:

1. Célula de Gestão Administrativa e Compras
2. Célula de Gestão Pessoal
3. Célula de Gestão Financeira
4. Célula de Gestão de Patrimônio
5. Célula de Gestão de Processos
6. Controle Interno e Ouvidoria

## Observações

- ⚠️  Guarde as credenciais do administrador em local seguro
- 📝 Recomenda-se criar apenas um ou dois administradores iniciais
- 🔒 Administradores têm acesso total ao sistema
