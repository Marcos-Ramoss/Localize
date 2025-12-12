const { AuthService } = require('../services/AuthService');
const { CreateUserDto, LoginDto } = require('../dtos/UserDto');
const { ValidacaoExcecao, AutenticacaoExcecao } = require('../exceptions/AppException');

class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    showRegisterPage(req, res) {
        res.render('register');
    }

    async register(req, res) {
        try {
            const createUserDto = new CreateUserDto({
                username: req.body.username,
                password: req.body.password,
                role: req.body.role
            });

            await this.authService.register(createUserDto, req.body.companyCode);
            res.redirect('/login');
        } catch (error) {
            this.handleError(error, res, '/register');
        }
    }

    showLoginPage(req, res) {
        res.render('login');
    }

    async login(req, res) {
        try {
            const loginDto = new LoginDto({
                username: req.body.username,
                password: req.body.password
            });

            const userDto = await this.authService.login(loginDto);
            
            req.session.user = {
                id: userDto.id,
                username: userDto.username,
                role: userDto.role
            };

            if (userDto.role === 'admin') {
                res.redirect('/menu');
            } else {
                res.redirect('/products');
            }
        } catch (error) {
            this.handleLoginError(error, res);
        }
    }

    logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }

    handleError(error, res, redirectPath) {
        if (error instanceof ValidacaoExcecao) {
            return res.send(error.message);
        }
        res.send('Erro ao processar requisição');
    }

    handleLoginError(error, res) {
        if (error instanceof AutenticacaoExcecao) {
            return res.status(403).send(this.getLoginErrorHtml());
        }
        res.send('Erro ao fazer login');
    }

    getLoginErrorHtml() {
        return `
            <html>
                <head>
                    <title>Credenciais Inválidas</title>
                    <meta http-equiv="refresh" content="3;url=/login">
                </head>
                <body>
                    <h1>Credenciais Inválidas</h1>
                    <p>Você será redirecionado para a página de login em 3 segundos...</p>
                </body>
            </html>
        `;
    }
}

module.exports = { AuthController };

