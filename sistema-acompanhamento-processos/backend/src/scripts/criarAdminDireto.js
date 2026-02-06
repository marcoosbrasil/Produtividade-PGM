const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../database/processos.db');
const db = new sqlite3.Database(dbPath);

async function criarAdmin() {
  const nome = 'Marcos Santos';
  const email = 'marcos.santos.pgm.fortaleza@gmail.com';
  const senha = 'pgm@2026';

  console.log('\n=== Criando Usuário Administrador ===\n');
  console.log(`Nome: ${nome}`);
  console.log(`Email: ${email}`);
  console.log('Senha: ******\n');

  try {
    // Verificar se o email já existe
    const usuarioExistente = await new Promise((resolve, reject) => {
      db.get('SELECT id, is_admin FROM usuarios WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (usuarioExistente) {
      if (usuarioExistente.is_admin) {
        console.log('⚠️  Este usuário já existe e já é administrador!');
      } else {
        // Atualizar para admin
        await new Promise((resolve, reject) => {
          db.run('UPDATE usuarios SET is_admin = 1 WHERE email = ?', [email], function(err) {
            if (err) reject(err);
            else resolve();
          });
        });
        console.log('✅ Usuário existente promovido a administrador!');
      }
    } else {
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

      console.log('✅ Administrador criado com sucesso!');
    }

    console.log('\n📋 Dados de acesso:');
    console.log(`Email: ${email}`);
    console.log(`Senha: ${senha}`);
    console.log('\n⚠️  Guarde essas informações em local seguro!');
    console.log('\n🔗 Acesse: http://localhost:3000/login\n');

  } catch (error) {
    console.error('\n❌ Erro ao criar administrador:', error.message);
  } finally {
    db.close();
  }
}

criarAdmin();
