import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { WeatherData, WeatherDay } from '../models/weather.model';
import { environment } from '../../environments/environment';
import { IconService } from './icon.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(
    private http: HttpClient,
    private iconService: IconService
  ) {}

  getWeatherData(latitude: number, longitude: number): Observable<WeatherData> {
    const url = `${environment.weatherApiUrl}?key=${environment.weatherApiKey}&location.latitude=${latitude}&location.longitude=${longitude}&days=${environment.defaultDays}`;

    return this.http.get<any>(url).pipe(
      map(response => {
        if (!response || !response.forecastDays || !Array.isArray(response.forecastDays)) {
          throw new Error('Formato de resposta inválido da API de previsão do tempo');
        }

       

        const forecast = response.forecastDays.map((day: any) => {
          const condition = day.daytimeForecast?.weatherCondition?.type || 'UNKNOWN';
          
          return {
            date: this.formatDate(day.displayDate),
            weatherCondition: this.getWeatherCondition(condition),
            iconUrl: this.iconService.getWeatherIcon(condition),
            temperature: {
              min: day.minTemperature?.degrees || 0,
              max: day.maxTemperature?.degrees || 0
            },
            humidity: day.daytimeForecast?.relativeHumidity || 0,
            windSpeed: day.daytimeForecast?.wind?.speed?.value || 0,
            precipitation: day.daytimeForecast?.precipitation?.probability?.percent || 0
          };
        });

        return {
          currentDay: forecast[0],
          forecast: forecast.slice(1)
        };
      }),
      catchError(error => {
        console.error('Erro ao buscar dados meteorológicos:', error);
        let errorMessage = 'Falha ao buscar dados meteorológicos. Por favor, tente novamente.';
        if (error.status === 401 || error.status === 403) {
          errorMessage = 'Chave de API inválida ou acesso não autorizado.';
        } else if (error.status === 404) {
          errorMessage = 'Dados meteorológicos não encontrados para esta localização.';
        } else if (error.message) {
          errorMessage = error.message;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private formatDate(displayDate: any): string {
    if (!displayDate) return new Date().toISOString().split('T')[0];
    const { year, month, day } = displayDate;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  private getWeatherCondition(type: string): string {
    if (!type) return 'Desconhecido';
    
    const conditionMap: { [key: string]: string } = {
      'CLEAR': 'Céu Limpo',
      'MOSTLY_CLEAR': 'Céu Predominantemente Limpo',
      'PARTLY_CLOUDY': 'Parcialmente Nublado',
      'MOSTLY_CLOUDY': 'Predominantemente Nublado',
      'CLOUDY': 'Nublado',
      'RAIN': 'Chuva',
      'SNOW': 'Neve',
      'THUNDERSTORM': 'Tempestade',
      'DRIZZLE': 'Garoa',
      'FOG': 'Neblina',
      'WINDY': 'Ventania',
      'SLEET': 'Granizo',
      'HEAVY_RAIN': 'Chuva Forte',
      'HEAVY_SNOW': 'Nevasca'
    };

    return conditionMap[type] || 'Desconhecido';
  }
}