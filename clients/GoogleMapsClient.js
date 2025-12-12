const axios = require('axios');
const { buildGeocodeUrl } = require('../config/googleMaps');
const { ValidacaoExcecao } = require('../exceptions/AppException');

class GoogleMapsClient {
    async geocodeAddress(address) {
        if (!address || address.trim() === '') {
            throw new ValidacaoExcecao('Endereço não pode ser vazio');
        }

        try {
            const geocodeUrl = buildGeocodeUrl(address);
            const response = await axios.get(geocodeUrl);
            const location = response.data.results[0]?.geometry?.location;

            if (!location) {
                throw new ValidacaoExcecao('Localização inválida');
            }

            return {
                latitude: location.lat,
                longitude: location.lng
            };
        } catch (error) {
            if (error instanceof ValidacaoExcecao) {
                throw error;
            }
            throw new ValidacaoExcecao('Erro ao geocodificar endereço');
        }
    }
}

module.exports = { GoogleMapsClient };

