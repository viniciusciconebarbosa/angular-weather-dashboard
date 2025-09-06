import { EnvironmentPlugin } from 'webpack';
const Dotenv = require('dotenv-webpack');
const { DefinePlugin } = require('webpack');

module.exports = {
  plugins: [
    new Dotenv(),
    new DefinePlugin({
      'process.env': {
        GEOCODING_API_KEY: JSON.stringify(process.env.GEOCODING_API_KEY),
        WEATHER_API_KEY: JSON.stringify(process.env.WEATHER_API_KEY),
        GEOCODING_API_URL: JSON.stringify(process.env.GEOCODING_API_URL || 'https://api.api-ninjas.com/v1/geocoding'),
        WEATHER_API_URL: JSON.stringify(process.env.WEATHER_API_URL || 'https://weather.googleapis.com/v1/forecast/days:lookup'),
        DEFAULT_DAYS: JSON.stringify(process.env.DEFAULT_DAYS || '10')
      }
    })
  ]
};