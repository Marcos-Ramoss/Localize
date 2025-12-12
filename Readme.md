# LOCALIZE+

## 📋 Sobre o Projeto

É um projeto que foi criado para apresentação na feira **Innovatec da FAMETRO** para obtenção de nota. Esta aplicação Web é voltada para facilitar a localização de produtos em determinado estabelecimento, possuindo um **QR CODE** na página inicial para o cliente acessar a aplicação.

### Funcionalidades

- ✅ Possui níveis de acesso: **usuário** e **admin**
- ✅ Banco de Dados MongoDB com criptografia de senha (bcrypt)
- ✅ Admin pode excluir usuários e cadastrar novos produtos dentro da empresa que adotar a aplicação
- ✅ Usuário pode apenas navegar na consulta para localizar o produto específico
- ✅ Aplicação conta com um sistema **CRUD** completo de cadastro
- ✅ Possui integração com **3 APIs do Google Maps** (API Places, API Routes, API Geocodificação)
- ✅ Possui validação de usuário já cadastrado evitando duplicidade
- ✅ Sistema de upload de imagens para produtos
- ✅ Geração de QR Code para acesso rápido

---

## 🔄 Sobre a Refatoração

Este projeto passou por uma **refatoração completa** seguindo os princípios **SOLID** e boas práticas de arquitetura de software.

### Contexto

O código original foi desenvolvido quando ainda não havia muito conhecimento sobre:
- Padrões de projeto (Design Patterns)
- Princípios SOLID
- Arquitetura em camadas
- Inversão de Dependência (DIP)
- Separação de responsabilidades
- Tratamento centralizado de exceções
- Uso de DTOs (Data Transfer Objects)

### Motivo da Refatoração

A refatoração foi realizada para **aplicar o conhecimento adquirido** sobre:
- ✅ Arquitetura em camadas (Controller → Service → Repository)
- ✅ Princípios SOLID
- ✅ Injeção de Dependência
- ✅ Tratamento centralizado de exceções
- ✅ Uso de DTOs e Mappers
- ✅ Parametrização de configurações (variáveis de ambiente)
- ✅ Código limpo e manutenível
- ✅ Métodos pequenos e coesos (limite de 20 linhas)

### Estrutura Atual

```
Localize/
├── controllers/     # Camada de controle HTTP
├── services/        # Lógica de negócio
├── repositories/    # Acesso ao banco de dados (com interfaces)
├── dtos/            # Data Transfer Objects
├── mappers/         # Conversão Entity ↔ DTO
├── exceptions/      # Exceções personalizadas
├── middleware/      # Middlewares (auth, error handling)
├── clients/         # Clientes HTTP (Google Maps)
├── config/          # Configurações (DB, session, multer, etc)
├── models/          # Modelos do MongoDB
├── views/           # Templates EJS
└── public/          # Arquivos estáticos
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado
- MongoDB instalado e rodando
- Chave da API do Google Maps

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Localize
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env` na raiz do projeto:
```env
MONGODB_URI=mongodb://localhost:27017/Localize+
SESSION_SECRET=secretKey
PORT=3000
BASE_URL=http://localhost:3000
GOOGLE_MAPS_API_KEY=sua_chave_api_google_maps_aqui
ADMIN_CODE=276451
```

4. Inicie o servidor:
```bash
npm start
```

5. Acesse no navegador:
```
http://localhost:3000
```

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript no servidor
- **Express** - Framework web minimalista para Node.js
- **Mongoose** - ODM (Object Document Mapper) para MongoDB
- **EJS** - Motor de template para renderização de HTML
- **Bcrypt** - Biblioteca para criptografia de senhas
- **Express-Session** - Gerenciamento de sessões
- **Multer** - Middleware para upload de arquivos
- **Axios** - Cliente HTTP para requisições
- **QRCode** - Geração de QR Codes

### Frontend
- **Bootstrap 5** - Framework CSS para interface responsiva
- **SweetAlert2** - Biblioteca para alertas e modais
- **Google Maps JavaScript API** - Integração com mapas

### Banco de Dados
- **MongoDB** - Banco de dados NoSQL

### APIs Externas
- **Google Maps Geocoding API** - Conversão de endereços em coordenadas
- **Google Maps Directions API** - Cálculo de rotas
- **Google Maps Places API** - Busca de lugares

---

## 📁 Estrutura de Diretórios

### `/controllers`
Responsáveis por lidar com requisições HTTP, validação de DTOs e chamar os Services.

### `/services`
Contém toda a lógica de negócio da aplicação. Services especializados por domínio.

### `/repositories`
Camada de acesso ao banco de dados. Implementam interfaces seguindo o princípio DIP.

### `/dtos`
Data Transfer Objects - objetos para transferência de dados entre camadas.

### `/mappers`
Classes responsáveis pela conversão bidirecional entre Entities e DTOs.

### `/exceptions`
Exceções personalizadas para tratamento de erros específicos da aplicação.

### `/middleware`
Middlewares para autenticação, autorização e tratamento global de erros.

### `/clients`
Clientes HTTP para comunicação com APIs externas (ex: Google Maps).

### `/config`
Arquivos de configuração (banco de dados, sessão, multer, etc).

### `/models`
Modelos do Mongoose (schemas do MongoDB).

### `/views`
Templates EJS para renderização das páginas.

### `/public`
Arquivos estáticos (CSS, JavaScript, imagens, uploads).

---

## 🔐 Segurança

- Senhas criptografadas com bcrypt (salt rounds: 10)
- Sessões gerenciadas com express-session
- Validação de acesso por roles (user/admin)
- Código de administrador para registro de admins
- Variáveis sensíveis em arquivo `.env` (não commitado)

---

## 📝 Notas Importantes

- O arquivo `.env` não deve ser commitado no repositório
- Configure a chave da API do Google Maps no arquivo `.env`
- Certifique-se de que o MongoDB está rodando antes de iniciar a aplicação
- Para produção, use valores seguros para `SESSION_SECRET`

---

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido como parte de um trabalho acadêmico e posteriormente refatorado para aplicar conhecimentos sobre:
- Arquitetura de software
- Padrões de projeto
- Princípios SOLID
- Boas práticas de desenvolvimento

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.

---

## 🔗 Links Úteis

- [Documentação do Express](https://expressjs.com/)
- [Documentação do Mongoose](https://mongoosejs.com/)
- [Documentação do Google Maps API](https://developers.google.com/maps/documentation)
- [Documentação do Bootstrap](https://getbootstrap.com/)
