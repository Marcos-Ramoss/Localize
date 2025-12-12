const express = require('express');
const { AuthController } = require('../controllers/AuthController');
const { ProductController } = require('../controllers/ProductController');
const { MenuController } = require('../controllers/MenuController');
const { QrCodeController } = require('../controllers/QrCodeController');
const { AuthService } = require('../services/AuthService');
const { ProductService } = require('../services/ProductService');
const { QrCodeService } = require('../services/QrCodeService');
const { UserRepository } = require('../repositories/UserRepository');
const { ProductRepository } = require('../repositories/ProductRepository');
const { GoogleMapsClient } = require('../clients/GoogleMapsClient');
const { isAdmin } = require('../middleware/authMiddleware');
const { upload } = require('../config/multer');

const router = express.Router();

// Injeção de dependências
const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const googleMapsClient = new GoogleMapsClient();
const authService = new AuthService(userRepository);
const productService = new ProductService(productRepository, googleMapsClient);
const qrCodeService = new QrCodeService();

const authController = new AuthController(authService);
const productController = new ProductController(productService);
const menuController = new MenuController();
const qrCodeController = new QrCodeController(qrCodeService);

// Rotas públicas
router.get('/', (req, res) => qrCodeController.showQrCodePage(req, res));
router.get('/register', (req, res) => authController.showRegisterPage(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.get('/login', (req, res) => authController.showLoginPage(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.get('/logout', (req, res) => authController.logout(req, res));

// Rotas de produtos (públicas para consulta)
router.get('/products', (req, res) => productController.listProducts(req, res));

// Rotas administrativas
router.get('/menu', isAdmin, (req, res) => menuController.showMenuPage(req, res));
router.get('/add-product', isAdmin, (req, res) => productController.showAddProductPage(req, res));
router.post('/add-product', isAdmin, upload.single('imagem'), (req, res) => productController.addProduct(req, res));
router.get('/products/:id/edit', isAdmin, (req, res) => productController.showEditProductPage(req, res));
router.post('/products/:id/edit', isAdmin, upload.single('imagem'), (req, res) => productController.updateProduct(req, res));
router.post('/products/:id/delete', isAdmin, (req, res) => productController.deleteProduct(req, res));

module.exports = router;

