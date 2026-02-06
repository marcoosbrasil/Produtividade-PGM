require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initPromise } = require('./config/database');
const authRoutes = require('./routes/auth');
const processosRoutes = require('./routes/processos');
const setoresRoutes = require('./routes/setores');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de Acompanhamento de Processos' });
});

app.use('/api/auth', authRoutes);
app.use('/api/processos', processosRoutes);
app.use('/api/setores', setoresRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Aguardar inicialização do banco antes de iniciar o servidor
initPromise
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📡 API disponível em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao inicializar banco de dados:', err);
    process.exit(1);
  });
