const { ProductService } = require('../services/ProductService');
const { CreateProductDto, UpdateProductDto } = require('../dtos/ProductDto');
const { RecursoNaoEncontradoExcecao } = require('../exceptions/AppException');

class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    showAddProductPage(req, res) {
        res.render('add-product');
    }

    async addProduct(req, res) {
        try {
            const imagePath = req.file ? `/img/uploads/${req.file.filename}` : null;
            
            const createProductDto = new CreateProductDto({
                nome: req.body.nome,
                marca: req.body.marca,
                estoque: parseInt(req.body.estoque),
                local: req.body.local,
                valor: parseFloat(req.body.valor),
                descricao: req.body.descricao
            });

            await this.productService.createProduct(createProductDto, imagePath);
            res.redirect('/add-product?status=success');
        } catch (error) {
            this.handleError(error, res, '/add-product');
        }
    }

    async listProducts(req, res) {
        try {
            const search = req.query.search || '';
            const userRole = req.session.user ? req.session.user.role : 'user';
            
            const productDtos = await this.productService.searchProducts(search);
            
            res.render('products', {
                products: productDtos,
                search,
                userRole
            });
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            res.send('Erro ao buscar produtos');
        }
    }

    async showEditProductPage(req, res) {
        try {
            const { id } = req.params;
            const productDto = await this.productService.getProductById(id);
            res.render('edit-product', { product: productDto });
        } catch (error) {
            this.handleError(error, res, '/products');
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const imagePath = req.file ? `/img/uploads/${req.file.filename}` : undefined;
            
            const updateProductDto = new UpdateProductDto({
                nome: req.body.nome,
                marca: req.body.marca,
                estoque: parseInt(req.body.estoque),
                local: req.body.local,
                valor: parseFloat(req.body.valor),
                descricao: req.body.descricao
            });

            await this.productService.updateProduct(id, updateProductDto, imagePath);
            res.redirect('/products?status=success');
        } catch (error) {
            this.handleError(error, res, '/products');
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            await this.productService.deleteProduct(id);
            res.redirect('/products?status=success');
        } catch (error) {
            this.handleError(error, res, '/products');
        }
    }

    handleError(error, res, redirectPath) {
        if (error instanceof RecursoNaoEncontradoExcecao) {
            return res.send(error.message);
        }
        console.error('Erro:', error);
        res.status(403).send(this.getErrorHtml(redirectPath));
    }

    getErrorHtml(redirectPath) {
        return `
            <html>
                <head>
                    <title>Erro</title>
                    <meta http-equiv="refresh" content="3;url=${redirectPath}">
                </head>
                <body>
                    <h1>Erro ao processar requisição</h1>
                    <p>Você será redirecionado em 3 segundos...</p>
                </body>
            </html>
        `;
    }
}

module.exports = { ProductController };

