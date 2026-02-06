const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const readline = require('readline');

const dbPath = path.join(__dirname, '../../database/processos.db');
const db = new sqlite3.Database(dbPath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function criarAdmin() {
  console.log('\n=== Criar Usuário Administrador ===\n');

  const nome = await question('Nome completo: ');
  const email = await question('Email: ');
  const senha = await question('Senha (mínimo 6 caracteres): ');

  if (!nome || !email || !senha) {
    console.error('\n❌ Todos os campos são obrigatórios!');
    rl.close();
    db.close();
    return;
  }

  if (senha.length < 6) {
    console.error('\n❌ A senha deve ter no mínimo 6 caracteres!');
    rl.close();
    db.close();
    return;
  }

  try {
    // Verificar se o email já existe
    const usuarioExistente = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM usuarios WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (usuarioExistente) {
      console.error('\n❌ Já existe um usuário com este email!');
      rl.close();
      db.close();
      return;
    }

    // Criar hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Inserir usuário admin
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO usuarios (nome, email, senha, is_admin) VALUES (?, ?, ?, 1)',
        [nome, email, hashedPassword],
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });

    console.log('\n✅ Administrador criado com sucesso!');
    console.log('\nDados de acesso:');
    console.log(`Email: ${email}`);
    console.log(`Senha: ${senha}`);
    console.log('\n⚠️  Guarde essas informações em local seguro!\n');

  } catch (error) {
    console.error('\n❌ Erro ao criar administrador:', error.message);
  } finally {
    rl.close();
    db.close();
  }
}

criarAdmin();
