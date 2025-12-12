const User = require('../models/user');
const { IUserRepository } = require('./interfaces/IUserRepository');

class UserRepository extends IUserRepository {
    async findByUsername(username) {
        return await User.findOne({ username });
    }

    async findById(id) {
        return await User.findById(id);
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }
}

module.exports = { UserRepository };

