document.addEventListener("DOMContentLoaded", async () => {
    if (typeof document !== 'undefined') {
        // Código para o navegador
        console.log("Executando no navegador");
    } else {
        // Código para o servidor
        console.log("Executando no servidor");
    }
    // Inicializar o MazeMap
    const map = new MazeMap.Map(document.getElementById('map'), {
        center: { lat: 59.914, lng: 10.752 }, // Coordenadas iniciais (substitua com as reais)
        zoom: 16
    });

    try {
        // Buscar produtos da API
        const response = await fetch('/api/products');
        const products = await response.json();

        // Adicionar marcadores para cada produto
        products.forEach(product => {
            const { nome, coordinates, local } = product;

            if (coordinates) {
                const marker = new MazeMap.Marker({ position: coordinates }).addTo(map);

                // Adicionar popup com detalhes do produto
                marker.bindPopup(`
                    <b>${nome}</b><br>
                    Prateleira: ${local}
                `);
            }
        });
    } catch (error) {
        console.error('Erro ao carregar produtos no mapa:', error);
    }
});