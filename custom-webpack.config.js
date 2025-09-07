const { DefinePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv({
      systemvars: true // Carrega também as variáveis de ambiente do sistema
    }),
    new DefinePlugin({
      'process.env.GEOCODING_API_KEY': JSON.stringify(process.env.ANGULAR_GEOCODING_API_KEY),
      'process.env.WEATHER_API_KEY': JSON.stringify(process.env.ANGULAR_WEATHER_API_KEY),
      'process.env.GEOCODING_API_URL': JSON.stringify(process.env.ANGULAR_GEOCODING_API_URL),
      'process.env.WEATHER_API_URL': JSON.stringify(process.env.ANGULAR_WEATHER_API_URL),
      'process.env.DEFAULT_DAYS': JSON.stringify(process.env.ANGULAR_DEFAULT_DAYS)
    })
  ]
};