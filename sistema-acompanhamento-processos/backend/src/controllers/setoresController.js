const db = require('../config/database');

exports.listarSetores = (req, res) => {
  const sql = 'SELECT * FROM setores WHERE ativo = 1 ORDER BY nome';

  db.all(sql, [], (err, setores) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar setores' });
    }
    res.json(setores);
  });
};

exports.buscarSetor = (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM setores WHERE id = ?', [id], (err, setor) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar setor' });
    }
    if (!setor) {
      return res.status(404).json({ erro: 'Setor não encontrado' });
    }
    res.json(setor);
  });
};

exports.atualizarSetor = (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'Nome do setor é obrigatório' });
  }

  const sql = 'UPDATE setores SET nome = ?, descricao = ? WHERE id = ?';

  db.run(sql, [nome, descricao, id], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ erro: 'Já existe um setor com este nome' });
      }
      return res.status(500).json({ erro: 'Erro ao atualizar setor' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ erro: 'Setor não encontrado' });
    }
    res.json({ mensagem: 'Setor atualizado com sucesso' });
  });
};

exports.toggleSetorAtivo = (req, res) => {
  const { id } = req.params;

  db.get('SELECT ativo FROM setores WHERE id = ?', [id], (err, setor) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao buscar setor' });
    }
    if (!setor) {
      return res.status(404).json({ erro: 'Setor não encontrado' });
    }

    const novoStatus = setor.ativo ? 0 : 1;

    db.run('UPDATE setores SET ativo = ? WHERE id = ?', [novoStatus, id], function (err) {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao atualizar status do setor' });
      }
      res.json({
        mensagem: `Setor ${novoStatus ? 'ativado' : 'desativado'} com sucesso`,
        ativo: Boolean(novoStatus)
      });
    });
  });
};
