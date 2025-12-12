const { ProductRepository } = require('../repositories/ProductRepository');
const { GoogleMapsClient } = require('../clients/GoogleMapsClient');
const { CreateProductDto, UpdateProductDto } = require('../dtos/ProductDto');
const { ProductMapper } = require('../mappers/ProductMapper');
const { RecursoNaoEncontradoExcecao, ValidacaoExcecao } = require('../exceptions/AppException');

class ProductService {
    constructor(productRepository, googleMapsClient) {
        this.productRepository = productRepository;
        this.googleMapsClient = googleMapsClient;
    }

    async createProduct(createProductDto, imagePath) {
        const coordinates = await this.getCoordinates(createProductDto.local);
        
        const productData = {
            ...createProductDto,
            imagem: imagePath,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
        };

        const product = await this.productRepository.create(productData);
        return ProductMapper.toDto(product);
    }

    async updateProduct(id, updateProductDto, imagePath) {
        const product = await this.productRepository.findById(id);
        
        if (!product) {
            throw new RecursoNaoEncontradoExcecao('Produto não encontrado');
        }

        const updateData = await this.prepareUpdateData(updateProductDto, imagePath);
        const updatedProduct = await this.productRepository.update(id, updateData);
        
        return ProductMapper.toDto(updatedProduct);
    }

    async deleteProduct(id) {
        const product = await this.productRepository.findById(id);
        
        if (!product) {
            throw new RecursoNaoEncontradoExcecao('Produto não encontrado');
        }

        await this.productRepository.delete(id);
    }

    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        
        if (!product) {
            throw new RecursoNaoEncontradoExcecao('Produto não encontrado');
        }

        return ProductMapper.toDto(product);
    }

    async searchProducts(searchTerm) {
        if (searchTerm && searchTerm.trim() !== '') {
            const products = await this.productRepository.findByNome(searchTerm);
            return ProductMapper.toDtoList(products);
        }
        
        const products = await this.productRepository.findAll();
        return ProductMapper.toDtoList(products);
    }

    async getCoordinates(address) {
        if (!address || address.trim() === '') {
            throw new ValidacaoExcecao('Endereço não pode ser vazio');
        }

        return await this.googleMapsClient.geocodeAddress(address);
    }

    async prepareUpdateData(updateProductDto, imagePath) {
        const updateData = { ...updateProductDto };

        if (updateProductDto.local) {
            const coordinates = await this.getCoordinates(updateProductDto.local);
            updateData.latitude = coordinates.latitude;
            updateData.longitude = coordinates.longitude;
        }

        if (imagePath) {
            updateData.imagem = imagePath;
        }

        return updateData;
    }
}

module.exports = { ProductService };

