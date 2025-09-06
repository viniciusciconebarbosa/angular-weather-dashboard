import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDay } from '../../models/weather.model';
import { Location } from '../../models/location.model';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';
import { WeatherAnimationComponent } from '../weather-animation/weather-animation.component';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, WeatherIconComponent, WeatherAnimationComponent],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ],
  template: `
    <div class="current-weather card" [ngClass]="weatherClass" @fadeInUp>
      <app-weather-animation [weatherClass]="weatherClass"></app-weather-animation>

      <div class="location-info">
        <div class="location-header">
          <span class="material-icons-round location-icon">location_on</span>
          <div>
            <h2>{{ location?.name }}</h2>
            <p>{{ location?.state }}, {{ location?.country }}</p>
          </div>
        </div>
        <p class="date">{{ getCurrentDate() }}</p>
      </div>
      
      <div class="weather-info">
        <div class="temperature">
          <span class="temp-value">{{ currentWeather.temperature.max | number:'1.0-0' }}°</span>
          <span class="unit">C</span>
        </div>
        
        <div class="condition">
          <app-weather-icon [condition]="currentWeather.weatherCondition" [iconUrl]="currentWeather.iconUrl" [size]="64"></app-weather-icon>
          <span>{{ currentWeather.weatherCondition }}</span>
        </div>
      </div>
      
      <div class="details glass-effect">
        <div class="detail-item">
          <span class="material-icons-round detail-icon">water_drop</span>
          <div class="detail-content">
            <span class="label">Umidade</span>
            <span class="value">{{ currentWeather.humidity }}%</span>
          </div>
        </div>
        <div class="detail-item">
          <span class="material-icons-round detail-icon">air</span>
          <div class="detail-content">
            <span class="label">Vento</span>
            <span class="value">{{ currentWeather.windSpeed }} km/h</span>
          </div>
        </div>
        <div class="detail-item">
          <span class="material-icons-round detail-icon">umbrella</span>
          <div class="detail-content">
            <span class="label">Precipitação</span>
            <span class="value">{{ currentWeather.precipitation }}%</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .current-weather {
      padding: calc(var(--spacing-unit) * 4);
      color: var(--text-light);
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      margin-bottom: calc(var(--spacing-unit) * 3);
      position: relative;
      overflow: hidden;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      z-index: 1;
      border-radius: 24px;
    }
    
    .current-weather:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .location-info {
      margin-bottom: calc(var(--spacing-unit) * 3);
      position: relative;
      z-index: 1;
    }
    
    .location-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-unit);
      margin-bottom: calc(var(--spacing-unit) * 0.5);
    }
    
    .location-icon {
      font-size: 24px;
    }
    
    h2 {
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 0;
      letter-spacing: 0.01em;
    }
    
    .date {
      margin-top: var(--spacing-unit);
      opacity: 0.9;
      margin-left: calc(24px + var(--spacing-unit));
      font-weight: 300;
    }
    
    .weather-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: calc(var(--spacing-unit) * 3);
      position: relative;
      z-index: 1;
    }
    
    .temperature {
      display: flex;
      align-items: flex-start;
    }
    
    .temp-value {
      font-size: 4rem;
      font-weight: 300;
      line-height: 1;
      letter-spacing: -2px;
    }
    
    .unit {
      font-size: 1.5rem;
      margin-top: 8px;
      margin-left: 4px;
      opacity: 0.9;
    }
    
    .condition {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .condition span {
      margin-top: 8px;
      font-weight: 500;
      letter-spacing: 0.02em;
    }
    
    .details {
      display: flex;
      justify-content: space-between;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: var(--border-radius);
      padding: calc(var(--spacing-unit) * 3);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      position: relative;
      z-index: 1;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: calc(var(--spacing-unit) * 1.5);
    }
    
    .detail-icon {
      font-size: 24px;
      opacity: 0.9;
    }
    
    .detail-content {
      display: flex;
      flex-direction: column;
    }
    
    .label {
      font-size: 0.85rem;
      opacity: 0.9;
      margin-bottom: 2px;
      font-weight: 400;
    }
    
    .value {
      font-weight: 600;
      font-size: 1.125rem;
    }
    
    /* Weather condition classes */
    .weather-sunny {
      background: linear-gradient(135deg, #ff7e00, #ffb300);
    }
    
    .weather-cloudy {
      background: linear-gradient(135deg, #64748b, #94a3b8);
    }
    
    .weather-rainy {
      background: linear-gradient(135deg, #475569, #94a3b8);
    }
    
    .weather-thunderstorm {
      background: linear-gradient(135deg, #334155, #475569);
    }
    
    .weather-snow {
      background: linear-gradient(135deg, #64748b, #cbd5e1);
    }
    
    .weather-mist {
      background: linear-gradient(135deg, #94a3b8, #cbd5e1);
    }
    
    @media (max-width: 768px) {
      .current-weather {
        padding: calc(var(--spacing-unit) * 3);
      }
      
      .weather-info {
        flex-direction: column;
        align-items: flex-start;
        gap: calc(var(--spacing-unit) * 2);
      }
      
      .condition {
        flex-direction: row;
        gap: var(--spacing-unit);
      }
      
      .condition span {
        margin-top: 0;
      }
      
      .details {
        flex-direction: column;
        gap: calc(var(--spacing-unit) * 2);
      }
      
      .detail-item {
        width: 100%;
      }
      
      .temp-value {
        font-size: 3.5rem;
      }
    }
  `]
})
export class CurrentWeatherComponent implements OnInit, OnChanges {
  @Input() currentWeather!: WeatherDay;
  @Input() location: Location | null = null;
  
  weatherClass: string = '';
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    this.updateWeatherClass();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentWeather']) {
      this.updateWeatherClass();
    }
  }
  
  private updateWeatherClass() {
    this.weatherClass = this.getWeatherClass();
    this.themeService.setThemeColors(this.weatherClass);
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getWeatherClass(): string {
    const condition = this.currentWeather?.weatherCondition?.toLowerCase() || '';
    
    if (condition.includes('céu limpo') || condition.includes('claro')) {
      return 'weather-sunny';
    } else if (condition.includes('nublado') || condition.includes('encoberto')) {
      return 'weather-cloudy';
    } else if (condition.includes('chuva') || condition.includes('garoa')) {
      return 'weather-rainy';
    } else if (condition.includes('tempestade') || condition.includes('trovoada')) {
      return 'weather-thunderstorm';
    } else if (condition.includes('neve')) {
      return 'weather-snow';
    } else if (condition.includes('neblina') || condition.includes('nevoeiro')) {
      return 'weather-mist';
    }
    
    // Fallback para garantir que pelo menos alguma animação seja mostrada
    return 'weather-cloudy';
  }
}