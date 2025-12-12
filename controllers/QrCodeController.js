const { QrCodeService } = require('../services/QrCodeService');

class QrCodeController {
    constructor(qrCodeService) {
        this.qrCodeService = qrCodeService;
    }

    async showQrCodePage(req, res) {
        try {
            const url = this.qrCodeService.getRegisterUrl();
            const qrCodeImage = await this.qrCodeService.generateQrCode(url);
            res.render('qrcode', { qrCodeImage });
        } catch (error) {
            console.error('Erro ao gerar o QR Code:', error);
            res.status(500).send('Erro ao gerar o QR Code');
        }
    }
}

module.exports = { QrCodeController };

