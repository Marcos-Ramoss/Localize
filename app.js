const express = require('express');
const path = require('path');
const QRCode = require('qrcode');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const User = require('/Users/Marcos-Ramos/Desktop/Localize+/models/user');
const Product = require('./models/Product');
const flash = require('connect-flash');
const multer = require('multer');
const axios = require('axios');


// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public/img/uploads')); // Diretório onde as imagens serão salvas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif|jfif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb('Erro: Apenas imagens são permitidas!');
        }
    }
});


app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



// conectando com o nosso banco de dados
mongoose.connect('mongodb://localhost:27017/Localize+', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
});


// Rota da nossa pagina principal admin
app.get('/menu', isAdmin, (req, res) => {
    const role = req.session.role;
    res.render('menu-admin', { role });
});

// Rota do nosso QR code Localize+
app.get('/', async (req, res) => {
    const url = 'http://localhost:3000/register';
    try {
        const qrCodeImage = await QRCode.toDataURL(url);
        res.render('qrcode', { qrCodeImage });
    } catch (err) {
        console.error('Erro ao gerar o QR Code:', err);
        res.status(500).send('Erro ao gerar o QR Code');
    }
});

// rota de registro 
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, password, role, companyCode } = req.body;
    const ADMIN_CODE = '276451';

    // Validação da senha
    if (!password || password.length < 6) {
        return res.send('A senha precisa ter pelo menos 6 caracteres.');
    }

    // Verificação se usuario é admin
    if (role === 'admin' && companyCode !== ADMIN_CODE) {
        return res.send('Código da Empresa inválido para registro de administrador.');
    }

    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send('Nome de usuário já está em uso.');
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o novo usuário com a função especificada
        const newUser = new User({
            username,
            password: hashedPassword,
            role: role || 'user' // Define como 'user' caso 'role' não seja especificado
        });

        // Salva o usuário no MongoDB
        await newUser.save();
        console.log('Usuário registrado com sucesso:', newUser);
        res.redirect('/login');
    } catch (err) {
        console.error('Erro ao registrar o usuário:', err);

        // Tratamento de erro: detalhes do erro de validação
        if (err.name === 'ValidationError') {
            return res.send(`Erro de validação: ${Object.values(err.errors).map(e => e.message).join(', ')}`);
        } else {
            res.send('Erro ao registrar o usuário.');
        }
    }

});



// rota login
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            // Salva o ID do usuário e o papel (role) na sessão
            req.session.user = {
                id: user._id,
                username: user.username,
                role: user.role
            };
            // Redireciona com base no papel do usuário
            if (user.role === 'admin') {
                res.redirect('/menu');
            } else {
                res.redirect('/products'); // Redireciona usuários para a página de consulta de produtos
            }
        } else {
            res.status(403).send(`
                <html>
                    <head>
                        <title>Senha Incorreta</title>
                        <meta http-equiv="refresh" content="3;url=/login"> <!-- Redireciona para login após 3 segundos -->
                    </head>
                    <body>
                        <h1>Credencias Invalidas</h1>
                        <p>Você será redirecionado para a página de login em 3 segundos...</p>
                    </body>
                </html>
            `);
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.send('Erro ao fazer login.');
    }
});

// rota para admin adcionar produto
app.get('/add-product', isAdmin, (req, res) => {
    res.render('add-product'); // Página com formulário para adicionar produto
});

// Rota para processar o formulário de adição de produto
app.post('/add-product', isAdmin, upload.single('imagem'), async (req, res) => {
    const { nome, marca, estoque, local, valor, descricao } = req.body;
    const imagem = req.file ? `/img/uploads/${req.file.filename}` : null;

    try {

        // Chama a API de geocodificação
<<<<<<< HEAD
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(local)}&key=AIzaSyAWKSKC13K0y_dmnB2AdElNK-zHnQI39m8`;
=======
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(local)}&key=suakey;
>>>>>>> 2bda0a22edc2707e2eb0f35328a53c7845998d63
        const geocodeResponse = await axios.get(geocodeUrl);
        const location = geocodeResponse.data.results[0]?.geometry.location;

        if (!location) {
            return res.send('Localização inválida.');
        }

        // Criação de um novo produto
        const newProduct = new Product({
            nome,
            marca,
            estoque,
            local,
            valor,
            descricao,
            imagem,
            latitude: location.lat,
            longitude: location.lng

        });

        await newProduct.save();
        console.log('Produto adicionado com sucesso:', newProduct);
        console.log('Arquivo enviado:', req.file);
        console.log('Dados recebidos:', req.body);

        res.redirect('/add-product?status=success'); // Redireciona para a página de adição de produto
    } catch (err) {
        console.error('Erro ao adicionar o produto:', err);


        // Tratamento de erro de validação
        if (err.name === 'ValidationError') {
            return res.send(`Erro de validação: ${Object.values(err.errors).map(e => e.message).join(', ')}`);
        } else {
            res.status(403).send(`
                <html>
                    <head>
                        <title>Erro ao adicionar o produto</title>
                        <meta http-equiv="refresh" content="3;url=/add-product"> <!-- Redireciona para login após 3 segundos -->
                    </head>
                    <body>
                        <h1>Erro ao adicionar o produto</h1>
                        <p>Você será redirecionado para a página de login em 3 segundos...</p>
                    </body>
                </html>
            `);

        }
    }


});


// Rota para consulta de produtos
app.get('/products', async (req, res) => {
    const { search } = req.query;
    const userRole = req.session.user ? req.session.user.role : 'user';
    try {
        let products = [];
        // Se houver um termo de pesquisa, filtra os produtos pelo nome
        if (search && search.trim() !== '') {
            const query = { nome: new RegExp(search, 'i') };
            products = await Product.find(query);
        }
        // Renderiza a página com os produtos encontrados (ou vazia) e o termo de pesquisa
        res.render('products', { products, search, userRole });
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.send('Erro ao buscar produtos.');
    }
});


// rota para edição de produtos
app.get('/products/:id/edit', isAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (product) {
            res.render('edit-product', { product });
        } else {
            res.send('Produto não encontrado.');
        }
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
        res.send('Erro ao buscar produto.');
    }
});


// Rota para atualizar o produto no banco de dados
app.post('/products/:id/edit', isAdmin, upload.single('imagem'), async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, marca, estoque, local, valor } = req.body;
    const imagem = req.file ? `/img/uploads/${req.file.filename}` : undefined;

    try {
        let updateData = { nome, marca, estoque, local, valor, descricao };
        if (local) {
<<<<<<< HEAD
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(local)}&key=AIzaSyAWKSKC13K0y_dmnB2AdElNK-zHnQI39m8`;
=======
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(local)}&key=suakey`;
>>>>>>> 2bda0a22edc2707e2eb0f35328a53c7845998d63
            const geocodeResponse = await axios.get(geocodeUrl);
            const location = geocodeResponse.data.results[0]?.geometry.location;

            if (!location) {
                return res.send('Localização inválida. Por favor, verifique o endereço.');
            }

            updateData.latitude = location.lat;
            updateData.longitude = location.lng;
        }

        if (imagem) {
            updateData.imagem = imagem;
        } 

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
        
        if (updatedProduct) {
            res.redirect('/products?status=success');

        } else {
            res.send('Erro ao atualizar o produto.');
        }
    } catch (err) {
        console.error('Erro ao atualizar o produto:', err);
        res.send('Erro ao atualizar o produto.');
    }
});

// rota para deletar produto
app.post('/products/:id/delete', isAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.redirect('/products?status=success');
    } catch (err) {
        console.error('Erro ao deletar o produto:', err);
        res.send('Erro ao deletar o produto.');
    }
});

// Middleware para verificar se o usuário está logado
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// Middleware para verificar se o usuário é admin
function isAdmin(req, res, next) {
    if (req.session.role === 'admin') {
        return next();
    } else {
        res.send('Acesso restrito a administradores.');
    }
}

// validação para admin adcionar produto
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        next();
    } else {
        res.status(403).send(`
            <html>
                <head>
                    <title>Acesso Negado</title>
                    <meta http-equiv="refresh" content="3;url=/login"> <!-- Redireciona para login após 3 segundos -->
                </head>
                <body>
                    <h1>Acesso negado: somente administradores podem acessar esta página.</h1>
                    <p>Você será redirecionado para a página de login em 3 segundos...</p>
                </body>
            </html>
        `);
    }
}

// Middleware para verificar se o usuário é administrador nas rotas editar e deletar
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    } else {
        res.status(403).send(`
            <html>
                <head>
                    <title>Acesso Negado</title>
                    <meta http-equiv="refresh" content="3;url=/login"> <!-- Redireciona para login após 3 segundos -->
                </head>
                <body>
                    <h1>Acesso negado: somente administradores podem acessar esta página.</h1>
                    <p>Você será redirecionado para a página de login em 3 segundos...</p>
                </body>
            </html>
        `);
    }
}

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

// Rota para exibir o formulário de edição de produto
app.get('/edit-product/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const product = await Product.findById(id);
        if (!product) {
            return res.send('Produto não encontrado.');
        }

        res.render('edit-product', { product });
    } catch (err) {
        console.error('Erro ao buscar produto para edição:', err);
        res.send('Erro ao buscar produto para edição.');
    }
});

// Rota para salvar as alterações no produto
app.post('/edit-product/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, marca, estoque, local, valor, descricao } = req.body;

    try {
        await Product.findByIdAndUpdate(id, { nome, marca, estoque, local, valor, descricao });
        res.redirect('/products');

    } catch (err) {
        console.error('Erro ao atualizar o produto:', err);
        res.send('Erro ao atualizar o produto.');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});




