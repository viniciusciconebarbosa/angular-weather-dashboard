import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ThemeColors {
  primary: string;
  secondary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private defaultTheme: ThemeColors = {
    primary: '#4a6fa1',
    secondary: '#6b8cbc'
  };

  private themeColorsSubject = new BehaviorSubject<ThemeColors>(this.defaultTheme);
  themeColors$: Observable<ThemeColors> = this.themeColorsSubject.asObservable();

  setThemeColors(weatherClass: string): void {
    let themeColors: ThemeColors;

    switch (weatherClass) {
      case 'weather-sunny':
        themeColors = {
          primary: '#ff7e00',
          secondary: '#ffb300'
        };
        break;
      case 'weather-cloudy':
        themeColors = {
          primary: '#6a88a5',
          secondary: '#9bb5d3'
        };
        break;
      case 'weather-rainy':
        themeColors = {
          primary: '#57606f',
          secondary: '#8395a7'
        };
        break;
      case 'weather-thunderstorm':
        themeColors = {
          primary: '#2f3542',
          secondary: '#57606f'
        };
        break;
      case 'weather-snow':
        themeColors = {
          primary: '#67809f',
          secondary: '#a5b1c2'
        };
        break;
      case 'weather-mist':
        themeColors = {
          primary: '#a5b1c2',
          secondary: '#d1d8e0'
        };
        break;
      case 'weather-sunny-night':
        themeColors = {
          primary: '#2c3e50',
          secondary: '#4a6fa1'
        };
        break;
      case 'weather-cloudy-night':
        themeColors = {
          primary: '#2c3e50',
          secondary: '#34495e'
        };
        break;
      case 'weather-rainy-night':
        themeColors = {
          primary: '#1e272e',
          secondary: '#2f3542'
        };
        break;
      case 'weather-thunderstorm-night':
        themeColors = {
          primary: '#1e272e',
          secondary: '#2d3436'
        };
        break;
      case 'weather-snow-night':
        themeColors = {
          primary: '#2c3e50',
          secondary: '#34495e'
        };
        break;
      case 'weather-mist-night':
        themeColors = {
          primary: '#34495e',
          secondary: '#2c3e50'
        };
        break;
      default:
        themeColors = this.defaultTheme;
    }

    this.themeColorsSubject.next(themeColors);
  }
} 