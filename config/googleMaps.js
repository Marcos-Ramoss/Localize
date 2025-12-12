require('dotenv').config();

const getGoogleMapsApiKey = () => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        console.warn('AVISO: GOOGLE_MAPS_API_KEY não está definida no arquivo .env');
    }
    return apiKey;
};

const buildGeocodeUrl = (address) => {
    const apiKey = getGoogleMapsApiKey();
    if (!apiKey) {
        throw new Error('GOOGLE_MAPS_API_KEY não está configurada. Configure no arquivo .env');
    }
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
};

module.exports = {
    getGoogleMapsApiKey,
    buildGeocodeUrl
};

