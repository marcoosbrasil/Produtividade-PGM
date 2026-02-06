const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    db.run(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
      [nome, email, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes('UNIQUE')) {
            return res.status(400).json({ erro: 'Email já cadastrado' });
          }
          return res.status(500).json({ erro: 'Erro ao criar usuário' });
        }

        res.status(201).json({
          mensagem: 'Usuário criado com sucesso',
          usuario: { id: this.lastID, nome, email }
        });
      }
    );
  } catch (erro) {
    res.status(500).json({ erro: 'Erro no servidor' });
  }
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  db.get('SELECT * FROM usuarios WHERE email = ?', [email], async (err, usuario) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro no servidor' });
    }

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // Buscar setores do usuário
    db.all(
      `SELECT s.id, s.nome, s.descricao
       FROM setores s
       INNER JOIN usuario_setores us ON s.id = us.setor_id
       WHERE us.usuario_id = ? AND s.ativo = 1`,
      [usuario.id],
      (err, setores) => {
        if (err) {
          console.error('Erro ao buscar setores do usuário:', err);
          setores = [];
        }

        const token = jwt.sign(
          {
            id: usuario.id,
            email: usuario.email,
            nome: usuario.nome,
            is_admin: Boolean(usuario.is_admin)
          },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({
          mensagem: 'Login realizado com sucesso',
          token,
          usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            is_admin: Boolean(usuario.is_admin),
            setores: setores || []
          }
        });
      }
    );
  });
};
