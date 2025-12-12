const { AppException } = require('../exceptions/AppException');

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppException) {
        if (req.accepts('html')) {
            return res.status(err.statusCode).send(`
                <html>
                    <head>
                        <title>Erro</title>
                        <meta http-equiv="refresh" content="3;url=/">
                    </head>
                    <body>
                        <h1>${err.message}</h1>
                        <p>Você será redirecionado em 3 segundos...</p>
                    </body>
                </html>
            `);
        }
        return res.status(err.statusCode).json({
            error: err.name,
            message: err.message
        });
    }

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message).join(', ');
        if (req.accepts('html')) {
            return res.status(400).send(`Erro de validação: ${messages}`);
        }
        return res.status(400).json({
            error: 'ValidationError',
            message: `Erro de validação: ${messages}`
        });
    }

    console.error('Erro não tratado:', err);
    if (req.accepts('html')) {
        return res.status(500).send('Erro interno do servidor');
    }
    res.status(500).json({
        error: 'InternalServerError',
        message: 'Erro interno do servidor'
    });
};

module.exports = { errorHandler };

