class IProductRepository {
    async findById(id) {
        throw new Error('Método findById deve ser implementado');
    }

    async findAll() {
        throw new Error('Método findAll deve ser implementado');
    }

    async findByNome(nome) {
        throw new Error('Método findByNome deve ser implementado');
    }

    async create(productData) {
        throw new Error('Método create deve ser implementado');
    }

    async update(id, productData) {
        throw new Error('Método update deve ser implementado');
    }

    async delete(id) {
        throw new Error('Método delete deve ser implementado');
    }
}

module.exports = { IProductRepository };

