class ProductDto {
    constructor({ id, nome, marca, estoque, local, valor, descricao, imagem, latitude, longitude, createdAt, updatedAt }) {
        this.id = id;
        this.nome = nome;
        this.marca = marca;
        this.estoque = estoque;
        this.local = local;
        this.valor = valor;
        this.descricao = descricao;
        this.imagem = imagem;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

class CreateProductDto {
    constructor({ nome, marca, estoque, local, valor, descricao, imagem, latitude, longitude }) {
        this.nome = nome;
        this.marca = marca;
        this.estoque = estoque;
        this.local = local;
        this.valor = valor;
        this.descricao = descricao;
        this.imagem = imagem;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

class UpdateProductDto {
    constructor({ nome, marca, estoque, local, valor, descricao, imagem, latitude, longitude }) {
        this.nome = nome;
        this.marca = marca;
        this.estoque = estoque;
        this.local = local;
        this.valor = valor;
        this.descricao = descricao;
        this.imagem = imagem;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

module.exports = {
    ProductDto,
    CreateProductDto,
    UpdateProductDto
};

