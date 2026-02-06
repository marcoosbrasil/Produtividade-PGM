const express = require('express');
const router = express.Router();
const processosController = require('../controllers/processosController');
const authenticateToken = require('../middleware/auth');

router.use(authenticateToken);

router.get('/', processosController.listarProcessos);
router.get('/:id', processosController.buscarProcesso);
router.post('/', processosController.criarProcesso);
router.put('/:id', processosController.atualizarProcesso);
router.delete('/:id', processosController.deletarProcesso);
router.post('/:processo_id/movimentacoes', processosController.adicionarMovimentacao);

module.exports = router;
