const { ProductDto } = require('../dtos/ProductDto');

class ProductMapper {
    static toDto(entity) {
        if (!entity) return null;
        
        return new ProductDto({
            id: entity._id?.toString(),
            nome: entity.nome,
            marca: entity.marca,
            estoque: entity.estoque,
            local: entity.local,
            valor: entity.valor,
            descricao: entity.descricao,
            imagem: entity.imagem,
            latitude: entity.latitude,
            longitude: entity.longitude,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        });
    }

    static toDtoList(entities) {
        if (!entities || !Array.isArray(entities)) return [];
        return entities.map(entity => this.toDto(entity));
    }
}

module.exports = { ProductMapper };

