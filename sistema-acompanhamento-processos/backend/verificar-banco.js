const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database/processos.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erro ao conectar:', err.message);
    process.exit(1);
  }

  console.log('✓ Conectado ao banco de dados\n');

  // Verificar estrutura da tabela processos
  db.all("PRAGMA table_info(processos)", [], (err, columns) => {
    if (err) {
      console.error('❌ Erro ao ler tabela:', err);
      process.exit(1);
    }

    console.log('📋 Estrutura da tabela PROCESSOS:');
    console.log('═'.repeat(60));
    columns.forEach(col => {
      console.log(`${col.name.padEnd(25)} | ${col.type.padEnd(15)} | ${col.notnull ? 'NOT NULL' : 'NULL'}`);
    });

    const temSetorId = columns.some(col => col.name === 'setor_id');

    console.log('\n' + '═'.repeat(60));
    if (temSetorId) {
      console.log('✅ Coluna setor_id EXISTE na tabela processos');
    } else {
      console.log('❌ Coluna setor_id NÃO EXISTE na tabela processos');
    }

    // Verificar setores
    db.all("SELECT * FROM setores", [], (err, setores) => {
      if (err) {
        console.error('❌ Erro ao ler setores:', err);
      } else {
        console.log(`\n📂 Total de setores cadastrados: ${setores.length}`);
        if (setores.length > 0) {
          console.log('\nSetores:');
          setores.forEach(s => {
            console.log(`  ${s.id}. ${s.nome}`);
          });
        }
      }

      db.close();
    });
  });
});
