const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Localize+';
        
        if (!mongoUri) {
            throw new Error('MONGODB_URI não está definida no arquivo .env');
        }

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        throw err;
    }
};

module.exports = { connectDatabase };

