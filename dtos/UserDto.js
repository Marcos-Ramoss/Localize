class UserDto {
    constructor({ id, username, role }) {
        this.id = id;
        this.username = username;
        this.role = role;
    }
}

class CreateUserDto {
    constructor({ username, password, role }) {
        this.username = username;
        this.password = password;
        this.role = role || 'user';
    }
}

class LoginDto {
    constructor({ username, password }) {
        this.username = username;
        this.password = password;
    }
}

module.exports = {
    UserDto,
    CreateUserDto,
    LoginDto
};

