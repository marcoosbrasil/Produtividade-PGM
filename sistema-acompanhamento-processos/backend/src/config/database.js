const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Determinar o caminho do banco de dados
const dbDir = path.join(__dirname, '../../database');
const dbPath = path.join(dbDir, 'processos.db');

let db;
let isInitialized = false;

// Criar diretório do banco se não existir
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✓ Diretório de banco de dados criado:', dbDir);
}

// Promise para inicialização do banco
const dbInitPromise = new Promise((resolve, reject) => {
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err.message);
      reject(err);
    } else {
      console.log('Conectado ao banco de dados SQLite.');
      initDatabase()
        .then(() => {
          isInitialized = true;
          console.log('✓ Banco de dados inicializado com sucesso!');
          resolve(db);
        })
        .catch(reject);
    }
  });
});

async function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Tabela de usuários
      db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          senha TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabela de setores
      db.run(`
        CREATE TABLE IF NOT EXISTS setores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT UNIQUE NOT NULL,
          descricao TEXT,
          ativo BOOLEAN DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tabela de relacionamento usuário-setor (many-to-many)
      db.run(`
        CREATE TABLE IF NOT EXISTS usuario_setores (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id INTEGER NOT NULL,
          setor_id INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE,
          FOREIGN KEY (setor_id) REFERENCES setores (id) ON DELETE CASCADE,
          UNIQUE(usuario_id, setor_id)
        )
      `);

      // Tabela de processos
      db.run(`
        CREATE TABLE IF NOT EXISTS processos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          numero_processo TEXT UNIQUE NOT NULL,
          titulo TEXT NOT NULL,
          descricao TEXT,
          status TEXT DEFAULT 'Em Análise',
          cliente TEXT,
          data_inicio DATE,
          data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
          usuario_id INTEGER,
          FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        )
      `);

      // Tabela de movimentações
      db.run(`
        CREATE TABLE IF NOT EXISTS movimentacoes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          processo_id INTEGER NOT NULL,
          descricao TEXT NOT NULL,
          data_movimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,
          usuario_id INTEGER,
          FOREIGN KEY (processo_id) REFERENCES processos (id) ON DELETE CASCADE,
          FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        )
      `);

      // MIGRAÇÃO: Adicionar colunas necessárias
      db.all("PRAGMA table_info(usuarios)", [], (err, columns) => {
        if (err) {
          console.error('Erro ao verificar colunas da tabela usuarios:', err);
          return;
        }
        const hasIsAdmin = columns.some(col => col.name === 'is_admin');
        if (!hasIsAdmin) {
          db.run('ALTER TABLE usuarios ADD COLUMN is_admin BOOLEAN DEFAULT 0', (err) => {
            if (err) {
              console.error('Erro ao adicionar coluna is_admin:', err);
            } else {
              console.log('✓ Coluna is_admin adicionada à tabela usuarios');
            }
          });
        }
      });

      db.all("PRAGMA table_info(processos)", [], (err, columns) => {
        if (err) {
          console.error('Erro ao verificar colunas da tabela processos:', err);
          return;
        }
        const hasSetorId = columns.some(col => col.name === 'setor_id');
        if (!hasSetorId) {
          db.run('ALTER TABLE processos ADD COLUMN setor_id INTEGER', (err) => {
            if (err) {
              console.error('Erro ao adicionar coluna setor_id:', err);
            } else {
              console.log('✓ Coluna setor_id adicionada à tabela processos');
            }
            // Aguardar um pouco para garantir que a coluna foi criada
            setTimeout(() => {
              criarIndicesEPopular(resolve);
            }, 100);
          });
        } else {
          criarIndicesEPopular(resolve);
        }
      });
    });
  });
}

function criarIndicesEPopular(resolve) {
  // Criar índices para otimização
  db.run('CREATE INDEX IF NOT EXISTS idx_usuario_setores_usuario ON usuario_setores(usuario_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_usuario_setores_setor ON usuario_setores(setor_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_processos_setor ON processos(setor_id)', (err) => {
    if (err) {
      console.error('Erro ao criar índices:', err);
    }
    // Popular setores e resolver a promise
    seedSetores().then(resolve);
  });
}

function seedSetores() {
  return new Promise((resolve) => {
    db.get("SELECT COUNT(*) as count FROM setores", [], (err, row) => {
      if (err) {
        console.error('Erro ao verificar setores:', err);
        resolve();
        return;
      }

      if (row.count === 0) {
        const setores = [
          {
            nome: 'Célula de Gestão Administrativa e Compras',
            descricao: 'Gestão administrativa e processos de compras'
          },
          {
            nome: 'Célula de Gestão Pessoal',
            descricao: 'Gestão de recursos humanos e folha de pagamento'
          },
          {
            nome: 'Célula de Gestão Financeira',
            descricao: 'Gestão financeira e orçamentária'
          },
          {
            nome: 'Célula de Gestão de Patrimônio',
            descricao: 'Gestão patrimonial e inventário'
          },
          {
            nome: 'Célula de Gestão de Processos',
            descricao: 'Gestão e acompanhamento de processos'
          },
          {
            nome: 'Controle Interno e Ouvidoria',
            descricao: 'Controle interno, auditoria e ouvidoria'
          }
        ];

        let completed = 0;
        setores.forEach(setor => {
          db.run(
            'INSERT INTO setores (nome, descricao) VALUES (?, ?)',
            [setor.nome, setor.descricao],
            (err) => {
              completed++;
              if (err) {
                console.error(`Erro ao inserir setor ${setor.nome}:`, err);
              } else {
                console.log(`✓ Setor "${setor.nome}" criado com sucesso`);
              }
              if (completed === setores.length) {
                resolve();
              }
            }
          );
        });
      } else {
        resolve();
      }
    });
  });
}

module.exports = db;
module.exports.initPromise = dbInitPromise;
