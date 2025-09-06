import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private readonly iconBasePath = '/assets/images';

  getWeatherIcon(condition: string): string {
    const iconMap: { [key: string]: string } = {
      'CLEAR': 'clear_day.svg',
      'CLEAR_NIGHT': 'clear_night.svg',
      'MOSTLY_CLEAR': 'cloudy_with_sunny_light.svg',
      'MOSTLY_CLEAR_NIGHT': 'cloudy_with_sunny_dark.svg',
      'PARTLY_CLOUDY': 'cloudy_with_sunny_light.svg',
      'PARTLY_CLOUDY_NIGHT': 'cloudy_with_sunny_dark.svg',
      'MOSTLY_CLOUDY': 'cloudy_with_sunny_dark.svg',
      'MOSTLY_CLOUDY_NIGHT': 'cloudy_with_sunny_dark.svg',
      'CLOUDY': 'cloudy.svg',
      'RAIN': 'rain_with_cloudy_light.svg',
      'RAIN_NIGHT': 'rain_with_cloudy_dark.svg',
      'SNOW': 'snow_with_cloudy_light.svg',
      'SNOW_NIGHT': 'snow_with_cloudy_dark.svg',
      'THUNDERSTORM': 'isolated_thunderstorms.svg',
      'DRIZZLE': 'drizzle.svg',
      'HEAVY_RAIN': 'heavy_rain.svg',
      'HEAVY_SNOW': 'heavy_snow.svg',
      'SLEET': 'sleet_hail.svg',
      'FOG': 'haze_fog_dust_smoke.svg',
      'WINDY': 'windy.svg'
    };

    const iconFile = iconMap[condition] || 'cloudy.svg';
    return `${this.iconBasePath}/${iconFile}`;
  }
} 