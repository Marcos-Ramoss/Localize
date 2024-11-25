## FRAMEORKS ULTILIZADOS  

## NODE.JS
O Node.js é um ambiente de execução de JavaScript no lado do servidor, baseado no motor V8 do Google Chrome. Ele permite a criação de aplicações escaláveis e rápidas, com foco em I/O assíncrona e não bloqueante. Com um vasto ecossistema de pacotes, o Node.js é amplamente usado para desenvolver servidores web e APIs.

## EXPRESS 
é um framework minimalista para Node.js, focado em facilitar o desenvolvimento de aplicações web e APIs. Ele fornece funcionalidades essenciais como roteamento, middleware e manipulação de requisições e respostas HTTP. Sua flexibilidade permite a criação de sistemas escaláveis e de fácil manutenção.

## EJS
O EJS (Embedded JavaScript) é um motor de template para Node.js que permite gerar HTML dinâmico, integrando dados JavaScript diretamente em templates. Ele usa tags especiais dentro de arquivos HTML para inserir variáveis e lógica condicional. Sua principal vantagem é a simplicidade e a flexibilidade ao renderizar conteúdo dinâmico no lado do servidor.

## MOONGOOSE
O Mongoose é uma biblioteca do Node.js que facilita a interação com bancos de dados MongoDB, fornecendo uma solução baseada em esquemas para validar, modelar e gerenciar dados. Ele permite criar modelos de dados, realizar operações como CRUD e aplicar validações. Além disso, o Mongoose oferece recursos como middleware e plugins, tornando o desenvolvimento mais eficiente e organizado.

## BYCRIPT
O framework Bcrypt é uma biblioteca de criptografia que fornece uma maneira segura de armazenar senhas, utilizando um algoritmo de hash adaptativo. Ele aplica um "sal" (salt) único para cada senha e permite ajustar o custo computacional da criptografia, tornando mais difícil a quebra de senhas por ataques de força bruta. É amplamente usado para proteger senhas em sistemas de autenticação.

## SESSION
O framework Session em JavaScript permite gerenciar sessões de usuário, armazenando dados no servidor para persistência entre requisições. Ele facilita a implementação de autenticação, controle de sessões e a manutenção de estado sem a necessidade de cookies. Normalmente, é usado em conjunto com Express.js para gerenciar sessões de forma eficiente em aplicativos web.

## USER
O framework User JavaScript é uma abordagem para personalizar e aprimorar a experiência de navegação no navegador usando JavaScript. Ele permite que o usuário modifique dinamicamente o comportamento de páginas web por meio de scripts executados no lado do cliente. Essa prática é popular em extensões de navegador, como o Tampermonkey, para ajustes personalizados de conteúdo e funcionalidades de sites.

## Multer
O Multer é um middleware de Node.js para manipulação de arquivos, utilizado em conjunto com o Express. Ele facilita o upload de arquivos, suportando diferentes tipos de armazenamento, como local ou na nuvem. Oferece recursos para gerenciar tipos, tamanhos e limites de arquivos enviados.

## AXIOS
O Axios é uma biblioteca JavaScript para fazer requisições HTTP de forma simples e eficiente. Ele suporta promessas, permitindo um controle fácil sobre as respostas ou erros das requisições. Além disso, é amplamente utilizado para interagir com APIs em aplicações web, oferecendo suporte para recursos como interceptadores e cancelamento de requisições.

## PATH
O Path Framework é uma biblioteca JavaScript que facilita o gerenciamento de rotas e navegação em aplicações web. Ele permite definir caminhos e parâmetros de URL, tornando a construção de aplicações single-page mais intuitiva. O framework é leve e flexível, focando na simplicidade e desempenho.

## BOOTSTRAP
O Bootstrap é um framework front-end que facilita o desenvolvimento de sites responsivos e móveis. Ele oferece uma coleção de componentes prontos, como botões, formulários e menus, que podem ser customizados. Combinando HTML, CSS e JavaScript, o Bootstrap permite a criação rápida de interfaces atraentes e funcionais.

                            ## DIRECTORIOS

## PASTA MODELS
A pasta "model" em JavaScript geralmente contém arquivos responsáveis pela definição das estruturas de dados e lógica de manipulação das informações. Esses arquivos podem incluir funções para interagir com o banco de dados, validar e formatar dados, além de gerenciar o fluxo de dados no backend. Em projetos MVC, o "model" serve para representar as entidades e regras de negócios do sistema.

## PASTA PUBLIC
A pasta "public" em JavaScript geralmente contém arquivos estáticos acessíveis diretamente pelo navegador, como imagens, fontes, CSS e o arquivo principal JavaScript (geralmente index.js). Esses arquivos são utilizados para fornecer conteúdo dinâmico ou interativo para o cliente. É comum em frameworks como React, Express ou Angular.

## PASTA VIEWS
O conceito de "Pasta Views" no JavaScript geralmente se refere a uma estrutura de arquivos em um projeto onde as views (ou visualizações) são organizadas em pastas, facilitando a separação de componentes e a manutenção do código. Isso pode ser usado em frameworks como React ou Vue, onde diferentes componentes e páginas são agrupados por funcionalidades. Esse modelo melhora a modularidade e escalabilidade do projeto, promovendo uma estrutura de pastas limpa e eficiente.

## PASTA PARTIALS DENTRO DA VIEWS
componentes reutilizáveis (como cabeçalhos ou rodapés) que são armazenados em uma pasta específica dentro da estrutura de "views" (visualizações) de um projeto, especialmente em frameworks como Express. Essas partials podem ser injetadas em diferentes páginas, evitando repetição de código. Isso facilita a manutenção e a modularização da aplicação.

## PASTA NODE_MODULES
A pasta node_modules no JavaScript é onde ficam armazenadas todas as dependências de pacotes e bibliotecas necessárias para um projeto Node.js. Ela é gerada automaticamente quando se executa o comando npm install e contém as versões exatas dos pacotes definidos no package.json. Não deve ser modificada manualmente, já que o gerenciamento de dependências é feito pelo gerenciador de pacotes, como o npm ou yarn.

## ARQUIVO PACKAGE.JSON
O arquivo package.json em JavaScript é um arquivo de configuração que contém metadados do projeto, como o nome, versão e dependências. Ele define os pacotes e scripts necessários para o projeto e facilita a instalação e gerenciamento de dependências. Além disso, o package.json também permite configurar scripts de execução, como testes e builds.

## ARQUIVO PACKAGE-LOCK.JSON
O arquivo package-lock.json no JavaScript é gerado automaticamente pelo npm para garantir a consistência das dependências em diferentes ambientes. Ele registra as versões exatas dos pacotes instalados e suas dependências, além de otimizar o desempenho de instalações subsequentes. Esse arquivo ajuda a evitar problemas de compatibilidade ao reproduzir um ambiente de desenvolvimento idêntico.

## APP.JS
ARQUIVO PRINCIPAL PARA RODAR TODA A APLICAÇÃO PELO TERMINAL NODE.


         ## APIS ULTIZADAS NO PROJETO 

## (GOOGLE MAPS) API PLACES
A API Google Maps Places permite buscar informações sobre locais, como restaurantes, hotéis e pontos turísticos, usando JavaScript. Com ela, é possível realizar buscas por tipo de lugar, nome ou localização geográfica. Os resultados incluem detalhes como nome, endereço, fotos e avaliações.

## (GOOGLE MAPS) API ROUTERS
A API de roteadores do Google Maps permite calcular rotas e direções entre locais usando dados de mapas e tráfego em tempo real. Ela suporta diversos modos de transporte, como carro, bicicleta, transporte público e a pé. A API fornece informações detalhadas sobre distância, duração e alternativas de rotas.

## (GOOGLE MAPS) API GEOCODIFICAÇÃO
<<<<<<< HEAD
A API de Geocodificação do Google Maps permite converter endereços em coordenadas geográficas (latitude e longitude) e vice-versa. Em JavaScript, usa-se o geocoder.geocode() para buscar coordenadas a partir de um endereço ou geocoder.reverseGeocode() para obter o endereço a partir das coordenadas. A resposta é manipulada com um callback que retorna os resultados da busca.
=======
A API de Geocodificação do Google Maps permite converter endereços em coordenadas geográficas (latitude e longitude) e vice-versa. Em JavaScript, usa-se o geocoder.geocode() para buscar coordenadas a partir de um endereço ou geocoder.reverseGeocode() para obter o endereço a partir das coordenadas. A resposta é manipulada com um callback que retorna os resultados da busca.
>>>>>>> 46695d8f93affada3d78fe1f3b552ab8894404ed
