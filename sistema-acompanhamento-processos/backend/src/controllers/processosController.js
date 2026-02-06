const db = require('../config/database');

// Função para gerar ID automático do processo
function gerarIdProcesso() {
  const ano = new Date().getFullYear();
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `PROC-${ano}-${timestamp}${random}`;
}

exports.listarProcessos = (req, res) => {
  const usuario_id = req.user.id;
  const is_admin = req.user.is_admin;

  let sql;
  let params = [];

  if (is_admin) {
    sql = `
      SELECT p.*, u.nome as usuario_nome, s.nome as setor_nome
      FROM processos p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      LEFT JOIN setores s ON p.setor_id = s.id
      ORDER BY p.data_atualizacao DESC
    `;
  } else {
    sql = `
      SELECT DISTINCT p.*, u.nome as usuario_nome, s.nome as setor_nome
      FROM processos p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      LEFT JOIN setores s ON p.setor_id = s.id
      INNER JOIN usuario_setores us ON p.setor_id = us.setor_id
      WHERE us.usuario_id = ?
      ORDER BY p.data_atualizacao DESC
    `;
    params = [usuario_id];
  }

  db.all(sql, params, (err, processos) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar processos' });
    }
    res.json(processos);
  });
};

exports.buscarProcesso = (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user.id;
  const is_admin = req.user.is_admin;

  const sql = `
    SELECT p.*, u.nome as usuario_nome, s.nome as setor_nome
    FROM processos p
    LEFT JOIN usuarios u ON p.usuario_id = u.id
    LEFT JOIN setores s ON p.setor_id = s.id
    WHERE p.id = ?
  `;

  db.get(sql, [id], (err, processo) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar processo' });
    }
    if (!processo) {
      return res.status(404).json({ erro: 'Processo não encontrado' });
    }

    if (!is_admin && processo.setor_id) {
      db.get(
        'SELECT 1 FROM usuario_setores WHERE usuario_id = ? AND setor_id = ?',
        [usuario_id, processo.setor_id],
        (err, acesso) => {
          if (err) {
            return res.status(500).json({ erro: 'Erro ao verificar permissões' });
          }
          if (!acesso) {
            return res.status(403).json({ erro: 'Você não tem permissão para acessar este processo' });
          }

          buscarMovimentacoes(processo, res);
        }
      );
    } else {
      buscarMovimentacoes(processo, res);
    }
  });

  function buscarMovimentacoes(processo, res) {
    db.all(
      'SELECT * FROM movimentacoes WHERE processo_id = ? ORDER BY data_movimentacao DESC',
      [id],
      (err, movimentacoes) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao buscar movimentações' });
        }
        res.json({ ...processo, movimentacoes });
      }
    );
  }
};

exports.criarProcesso = (req, res) => {
  let { numero_processo, titulo, descricao, status, cliente, data_inicio, setor_id } = req.body;
  const usuario_id = req.user.id;
  const is_admin = req.user.is_admin;

  if (!titulo) {
    return res.status(400).json({ erro: 'Título é obrigatório' });
  }

  if (!setor_id) {
    return res.status(400).json({ erro: 'Setor é obrigatório' });
  }

  if (!numero_processo || numero_processo.trim() === '') {
    numero_processo = gerarIdProcesso();
  }

  if (!is_admin) {
    db.get(
      'SELECT 1 FROM usuario_setores WHERE usuario_id = ? AND setor_id = ?',
      [usuario_id, setor_id],
      (err, acesso) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao verificar permissões' });
        }
        if (!acesso) {
          return res.status(403).json({ erro: 'Você não tem permissão para criar processos neste setor' });
        }
        inserirProcesso();
      }
    );
  } else {
    inserirProcesso();
  }

  function inserirProcesso() {
    const sql = `
      INSERT INTO processos (numero_processo, titulo, descricao, status, cliente, data_inicio, usuario_id, setor_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [numero_processo, titulo, descricao, status || 'Em Análise', cliente, data_inicio, usuario_id, setor_id],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ erro: 'Número de processo já cadastrado' });
          }
          return res.status(500).json({ erro: 'Erro ao criar processo' });
        }

        res.status(201).json({
          mensagem: 'Processo criado com sucesso',
          processo: { id: this.lastID, numero_processo }
        });
      }
    );
  }
};

exports.atualizarProcesso = (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, status, cliente, data_inicio, setor_id } = req.body;
  const usuario_id = req.user.id;
  const is_admin = req.user.is_admin;

  db.get('SELECT setor_id FROM processos WHERE id = ?', [id], (err, processo) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar processo' });
    }
    if (!processo) {
      return res.status(404).json({ erro: 'Processo não encontrado' });
    }

    if (!is_admin && processo.setor_id) {
      db.get(
        'SELECT 1 FROM usuario_setores WHERE usuario_id = ? AND setor_id = ?',
        [usuario_id, processo.setor_id],
        (err, acesso) => {
          if (err) {
            return res.status(500).json({ erro: 'Erro ao verificar permissões' });
          }
          if (!acesso) {
            return res.status(403).json({ erro: 'Você não tem permissão para atualizar este processo' });
          }

          if (setor_id && setor_id !== processo.setor_id) {
            db.get(
              'SELECT 1 FROM usuario_setores WHERE usuario_id = ? AND setor_id = ?',
              [usuario_id, setor_id],
              (err, acessoNovoSetor) => {
                if (err) {
                  return res.status(500).json({ erro: 'Erro ao verificar permissões' });
                }
                if (!acessoNovoSetor) {
                  return res.status(403).json({ erro: 'Você não tem permissão para mover este processo para o setor especificado' });
                }
                atualizarDados();
              }
            );
          } else {
            atualizarDados();
          }
        }
      );
    } else {
      atualizarDados();
    }

    function atualizarDados() {
      const sql = `
        UPDATE processos
        SET titulo = ?, descricao = ?, status = ?, cliente = ?, data_inicio = ?, setor_id = ?, data_atualizacao = CURRENT_TIMESTAMP
        WHERE id = ?
      `;

      db.run(
        sql,
        [titulo, descricao, status, cliente, data_inicio, setor_id || processo.setor_id, id],
        function (err) {
          if (err) {
            return res.status(500).json({ erro: 'Erro ao atualizar processo' });
          }
          res.json({ mensagem: 'Processo atualizado com sucesso' });
        }
      );
    }
  });
};

exports.deletarProcesso = (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user.id;
  const is_admin = req.user.is_admin;

  db.get('SELECT setor_id FROM processos WHERE id = ?', [id], (err, processo) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar processo' });
    }
    if (!processo) {
      return res.status(404).json({ erro: 'Processo não encontrado' });
    }

    if (!is_admin && processo.setor_id) {
      db.get(
        'SELECT 1 FROM usuario_setores WHERE usuario_id = ? AND setor_id = ?',
        [usuario_id, processo.setor_id],
        (err, acesso) => {
          if (err) {
            return res.status(500).json({ erro: 'Erro ao verificar permissões' });
          }
          if (!acesso) {
            return res.status(403).json({ erro: 'Você não tem permissão para deletar este processo' });
          }
          deletarDados();
        }
      );
    } else {
      deletarDados();
    }

    function deletarDados() {
      db.run('DELETE FROM processos WHERE id = ?', [id], function (err) {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao deletar processo' });
        }
        res.json({ mensagem: 'Processo deletado com sucesso' });
      });
    }
  });
};

exports.adicionarMovimentacao = (req, res) => {
  const { processo_id } = req.params;
  const { descricao } = req.body;
  const usuario_id = req.user.id;

  if (!descricao) {
    return res.status(400).json({ erro: 'Descrição é obrigatória' });
  }

  const sql = 'INSERT INTO movimentacoes (processo_id, descricao, usuario_id) VALUES (?, ?, ?)';

  db.run(sql, [processo_id, descricao, usuario_id], function (err) {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao adicionar movimentação' });
    }

    // Atualizar data de atualização do processo
    db.run('UPDATE processos SET data_atualizacao = CURRENT_TIMESTAMP WHERE id = ?', [processo_id]);

    res.status(201).json({
      mensagem: 'Movimentação adicionada com sucesso',
      movimentacao: { id: this.lastID }
    });
  });
};
