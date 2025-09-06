import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDay } from '../../models/weather.model';
import { Location } from '../../models/location.model';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';
import { WeatherAnimationComponent } from '../weather-animation/weather-animation.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, WeatherIconComponent, WeatherAnimationComponent],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
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
  ]
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
    
    return 'weather-cloudy';
  }
}