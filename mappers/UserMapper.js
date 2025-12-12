const { UserDto } = require('../dtos/UserDto');

class UserMapper {
    static toDto(entity) {
        if (!entity) return null;
        
        return new UserDto({
            id: entity._id?.toString(),
            username: entity.username,
            role: entity.role
        });
    }

    static toDtoList(entities) {
        if (!entities || !Array.isArray(entities)) return [];
        return entities.map(entity => this.toDto(entity));
    }
}

module.exports = { UserMapper };

