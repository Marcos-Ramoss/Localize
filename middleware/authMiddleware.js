const { NaoAutorizadoExcecao } = require('../exceptions/AppException');

const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    
    const error = new NaoAutorizadoExcecao('Acesso negado: somente administradores podem acessar esta página');
    return next(error);
};

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    
    res.redirect('/login');
};

module.exports = {
    isAdmin,
    isAuthenticated
};

