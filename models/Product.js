// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    nome: { 
        type: String, 
        required: [true, 'O nome do produto é obrigatório'] 
    },
    marca: { 
        type: String, 
        required: [true, 'A marca do produto é obrigatória'] 
    },
    estoque: { 
        type: Number, 
        required: [true, 'O estoque é obrigatório'], 
        min: [0, 'O estoque não pode ser negativo'] 
    },
    local: { 
        type: String, 
        required: [true, 'O local do produto é obrigatório'] 
    },
    valor: { 
        type: Number, 
        required: [true, 'O valor do produto é obrigatório'], 
        min: [0, 'O valor não pode ser negativo'] 
    },
    descricao: {
        type: String,
        required: [true, "A descrição é obrigatoria"]
    },
    imagem: {
        type: String
        
    },

    latitude: {
        type: Number
        
    },

    longitude: {
        type: Number
        
    },
   
   

    

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);



