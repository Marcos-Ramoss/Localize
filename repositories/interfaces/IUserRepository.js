class IUserRepository {
    async findByUsername(username) {
        throw new Error('Método findByUsername deve ser implementado');
    }

    async findById(id) {
        throw new Error('Método findById deve ser implementado');
    }

    async create(userData) {
        throw new Error('Método create deve ser implementado');
    }
}

module.exports = { IUserRepository };

