const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.use(authenticateToken);

router.get('/me/setores', usuariosController.getSetoresUsuario);
router.get('/', isAdmin, usuariosController.listarUsuarios);
router.get('/:id', isAdmin, usuariosController.buscarUsuario);
router.put('/:id/setores', isAdmin, usuariosController.atribuirSetores);
router.delete('/:id/setores/:setor_id', isAdmin, usuariosController.removerSetor);
router.patch('/:id/admin', isAdmin, usuariosController.toggleAdmin);

module.exports = router;
