const Product = require('../models/Product');
const { IProductRepository } = require('./interfaces/IProductRepository');

class ProductRepository extends IProductRepository {
    async findById(id) {
        return await Product.findById(id);
    }

    async findAll() {
        return await Product.find();
    }

    async findByNome(nome) {
        const query = { nome: new RegExp(nome, 'i') };
        return await Product.find(query);
    }

    async create(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async update(id, productData) {
        return await Product.findByIdAndUpdate(id, productData, { new: true });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = { ProductRepository };

