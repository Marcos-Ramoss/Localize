const QRCode = require('qrcode');
require('dotenv').config();

class QrCodeService {
    async generateQrCode(url) {
        try {
            const qrCodeImage = await QRCode.toDataURL(url);
            return qrCodeImage;
        } catch (error) {
            throw new Error('Erro ao gerar o QR Code');
        }
    }

    getRegisterUrl() {
        const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
        return `${baseUrl}/register`;
    }
}

module.exports = { QrCodeService };

