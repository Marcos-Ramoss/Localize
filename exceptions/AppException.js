class AppException extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class RecursoNaoEncontradoExcecao extends AppException {
    constructor(message = 'Recurso não encontrado') {
        super(message, 404);
    }
}

class ValidacaoExcecao extends AppException {
    constructor(message = 'Erro de validação') {
        super(message, 400);
    }
}

class NaoAutorizadoExcecao extends AppException {
    constructor(message = 'Acesso negado') {
        super(message, 403);
    }
}

class AutenticacaoExcecao extends AppException {
    constructor(message = 'Credenciais inválidas') {
        super(message, 401);
    }
}

module.exports = {
    AppException,
    RecursoNaoEncontradoExcecao,
    ValidacaoExcecao,
    NaoAutorizadoExcecao,
    AutenticacaoExcecao
};

