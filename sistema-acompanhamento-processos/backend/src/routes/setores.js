const express = require('express');
const router = express.Router();
const setoresController = require('../controllers/setoresController');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.use(authenticateToken);

router.get('/', setoresController.listarSetores);
router.get('/:id', setoresController.buscarSetor);
router.put('/:id', isAdmin, setoresController.atualizarSetor);
router.patch('/:id/toggle', isAdmin, setoresController.toggleSetorAtivo);

module.exports = router;
