const db = require('../config/database');

exports.listarUsuarios = (req, res) => {
  const sql = `
    SELECT
      u.id,
      u.nome,
      u.email,
      u.is_admin,
      u.created_at,
      GROUP_CONCAT(s.nome) as setores_nomes,
      COUNT(DISTINCT us.setor_id) as total_setores
    FROM usuarios u
    LEFT JOIN usuario_setores us ON u.id = us.usuario_id
    LEFT JOIN setores s ON us.setor_id = s.id
    GROUP BY u.id
    ORDER BY u.nome
  `;

  db.all(sql, [], (err, usuarios) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }

    const usuariosComSetores = usuarios.map(u => ({
      ...u,
      is_admin: Boolean(u.is_admin),
      setores_nomes: u.setores_nomes ? u.setores_nomes.split(',') : []
    }));

    res.json(usuariosComSetores);
  });
};

exports.buscarUsuario = (req, res) => {
  const { id } = req.params;

  db.get('SELECT id, nome, email, is_admin, created_at FROM usuarios WHERE id = ?', [id], (err, usuario) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    db.all(
      `SELECT s.id, s.nome, s.descricao
       FROM setores s
       INNER JOIN usuario_setores us ON s.id = us.setor_id
       WHERE us.usuario_id = ?`,
      [id],
      (err, setores) => {
        if (err) {
          return res.status(500).json({ erro: 'Erro ao buscar setores do usuário' });
        }

        res.json({
          ...usuario,
          is_admin: Boolean(usuario.is_admin),
          setores: setores || []
        });
      }
    );
  });
};

exports.getSetoresUsuario = (req, res) => {
  const usuario_id = req.user.id;

  db.all(
    `SELECT s.id, s.nome, s.descricao
     FROM setores s
     INNER JOIN usuario_setores us ON s.id = us.setor_id
     WHERE us.usuario_id = ? AND s.ativo = 1`,
    [usuario_id],
    (err, setores) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao buscar setores do usuário' });
      }
      res.json(setores || []);
    }
  );
};

exports.atribuirSetores = (req, res) => {
  const { id } = req.params;
  const { setor_ids } = req.body;

  if (!Array.isArray(setor_ids)) {
    return res.status(400).json({ erro: 'setor_ids deve ser um array' });
  }

  db.get('SELECT id FROM usuarios WHERE id = ?', [id], (err, usuario) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    db.run('DELETE FROM usuario_setores WHERE usuario_id = ?', [id], (err) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao remover setores antigos' });
      }

      if (setor_ids.length === 0) {
        return res.json({ mensagem: 'Setores atualizados com sucesso' });
      }

      let inserted = 0;
      let hasError = false;

      setor_ids.forEach(setor_id => {
        db.run(
          'INSERT INTO usuario_setores (usuario_id, setor_id) VALUES (?, ?)',
          [id, setor_id],
          (err) => {
            if (err && !hasError) {
              hasError = true;
              return res.status(500).json({ erro: 'Erro ao atribuir setores' });
            }
            inserted++;
            if (inserted === setor_ids.length && !hasError) {
              res.json({ mensagem: 'Setores atribuídos com sucesso' });
            }
          }
        );
      });
    });
  });
};

exports.removerSetor = (req, res) => {
  const { id, setor_id } = req.params;

  db.run(
    'DELETE FROM usuario_setores WHERE usuario_id = ? AND setor_id = ?',
    [id, setor_id],
    function (err) {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao remover setor' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ erro: 'Associação não encontrada' });
      }
      res.json({ mensagem: 'Setor removido com sucesso' });
    }
  );
};

exports.toggleAdmin = (req, res) => {
  const { id } = req.params;

  db.get('SELECT is_admin FROM usuarios WHERE id = ?', [id], (err, usuario) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const novoStatus = usuario.is_admin ? 0 : 1;

    db.run('UPDATE usuarios SET is_admin = ? WHERE id = ?', [novoStatus, id], function (err) {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar status de admin' });
      }
      res.json({
        mensagem: `Usuário ${novoStatus ? 'promovido a' : 'removido de'} administrador`,
        is_admin: Boolean(novoStatus)
      });
    });
  });
};
