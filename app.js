require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const flash = require('connect-flash');
const { connectDatabase } = require('./config/database');
const { sessionConfig } = require('./config/session');
const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');

// Verificar se o arquivo .env existe
if (!fs.existsSync('.env')) {
    console.warn('⚠️  AVISO: Arquivo .env não encontrado!');
    console.warn('📝 Crie um arquivo .env na raiz do projeto com as variáveis necessárias.');
    console.warn('📖 Veja o arquivo ENV_SETUP.md para mais informações.');
    console.warn('🔄 Usando valores padrão para desenvolvimento...\n');
}

const app = express();

// Middlewares
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

// Configuração de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Variável global para Google Maps API Key (para uso nas views)
app.locals.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

// Rotas
app.use('/', routes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Conectar ao banco de dados antes de iniciar o servidor
const startServer = async () => {
    try {
        await connectDatabase();
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (err) {
        console.error(' Erro ao conectar ao banco de dados:', err.message);
        console.error(' Verifique se o MongoDB está rodando e se o arquivo .env está configurado corretamente.');
        process.exit(1);
    }
};

startServer();
