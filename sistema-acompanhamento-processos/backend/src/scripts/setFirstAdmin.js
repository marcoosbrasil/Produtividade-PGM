const db = require('../config/database');

console.log('Iniciando script para definir primeiro administrador...');

setTimeout(() => {
  db.get('SELECT id, nome, email FROM usuarios ORDER BY id ASC LIMIT 1', [], (err, row) => {
    if (err) {
      console.error('Erro ao buscar primeiro usuário:', err);
      process.exit(1);
    }

    if (!row) {
      console.log('Nenhum usuário encontrado. Registre um usuário primeiro.');
      process.exit(0);
    }

    db.run('UPDATE usuarios SET is_admin = 1 WHERE id = ?', [row.id], (err) => {
      if (err) {
        console.error('Erro ao atualizar usuário:', err);
        process.exit(1);
      }

      console.log(`✓ Usuário "${row.nome}" (${row.email}) definido como administrador.`);
      process.exit(0);
    });
  });
}, 1000);
