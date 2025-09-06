declare const process: any; // Necessário para TypeScript

export const environment = {
  production: false,
  geocodingApiKey: process.env.GEOCODING_API_KEY,
  weatherApiKey: process.env.WEATHER_API_KEY,
  geocodingApiUrl: process.env.GEOCODING_API_URL || 'https://api.api-ninjas.com/v1/geocoding',
  weatherApiUrl: process.env.WEATHER_API_URL || 'https://weather.googleapis.com/v1/forecast/days:lookup',
  defaultDays: parseInt(process.env.DEFAULT_DAYS || '10', 10)
}; 