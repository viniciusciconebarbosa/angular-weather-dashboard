export interface WeatherData {
  currentDay: WeatherDay;
  forecast: WeatherDay[];
}

export interface WeatherDay {
  date: string;
  weatherCondition: string;
  iconUrl: string;
  temperature: {
    min: number;
    max: number;
  };
  humidity: number;
  windSpeed: number;
  precipitation: number;
}