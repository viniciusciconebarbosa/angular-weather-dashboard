const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      systemvars: true // Carrega variáveis de ambiente do sistema
    })
  ]
};