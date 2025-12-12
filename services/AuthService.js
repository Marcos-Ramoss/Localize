const bcrypt = require('bcrypt');
const { UserRepository } = require('../repositories/UserRepository');
const { CreateUserDto, LoginDto } = require('../dtos/UserDto');
const { UserMapper } = require('../mappers/UserMapper');
const { ValidacaoExcecao, AutenticacaoExcecao } = require('../exceptions/AppException');
require('dotenv').config();

class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.adminCode = process.env.ADMIN_CODE || '276451';
    }

    async register(createUserDto, companyCode) {
        this.validatePassword(createUserDto.password);
        this.validateAdminCode(createUserDto.role, companyCode);
        await this.checkUserExists(createUserDto.username);
        
        const hashedPassword = await this.hashPassword(createUserDto.password);
        const userData = {
            username: createUserDto.username,
            password: hashedPassword,
            role: createUserDto.role || 'user'
        };

        const user = await this.userRepository.create(userData);
        return UserMapper.toDto(user);
    }

    async login(loginDto) {
        const user = await this.userRepository.findByUsername(loginDto.username);
        
        if (!user) {
            throw new AutenticacaoExcecao();
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        
        if (!isPasswordValid) {
            throw new AutenticacaoExcecao();
        }

        return UserMapper.toDto(user);
    }

    validatePassword(password) {
        if (!password || password.length < 6) {
            throw new ValidacaoExcecao('A senha precisa ter pelo menos 6 caracteres');
        }
    }

    validateAdminCode(role, companyCode) {
        if (role === 'admin' && companyCode !== this.adminCode) {
            throw new ValidacaoExcecao('Código da Empresa inválido para registro de administrador');
        }
    }

    async checkUserExists(username) {
        const existingUser = await this.userRepository.findByUsername(username);
        if (existingUser) {
            throw new ValidacaoExcecao('Nome de usuário já está em uso');
        }
    }

    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
}

module.exports = { AuthService };

