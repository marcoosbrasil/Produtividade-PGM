function isAdmin(req, res, next) {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({
      erro: 'Acesso negado. Apenas administradores podem acessar este recurso.'
    });
  }
  next();
}

module.exports = isAdmin;
