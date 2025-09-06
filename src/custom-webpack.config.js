const { DefinePlugin } = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv(),
    new DefinePlugin({
      'process.env.GEOCODING_API_KEY': JSON.stringify(process.env.ANGULAR_GEOCODING_API_KEY),
      'process.env.WEATHER_API_KEY': JSON.stringify(process.env.ANGULAR_WEATHER_API_KEY),
      'process.env.GEOCODING_API_URL': JSON.stringify(process.env.ANGULAR_GEOCODING_API_URL || 'https://api.api-ninjas.com/v1/geocoding'),
      'process.env.WEATHER_API_URL': JSON.stringify(process.env.ANGULAR_WEATHER_API_URL || 'https://weather.googleapis.com/v1/forecast/days:lookup'),
      'process.env.DEFAULT_DAYS': JSON.stringify(process.env.ANGULAR_DEFAULT_DAYS || '10')
    })
  ]
}; 