import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private defaultTheme: ThemeColors = {
    primary: '#4a6fa1',
    secondary: '#6b8cbc',
    background: 'linear-gradient(135deg, #4a6fa1, #6b8cbc)'
  };

  private themeColorsSubject = new BehaviorSubject<ThemeColors>(this.defaultTheme);
  themeColors$: Observable<ThemeColors> = this.themeColorsSubject.asObservable();

  setThemeColors(weatherClass: string): void {
    let themeColors: ThemeColors;

    switch (weatherClass) {
      case 'weather-sunny':
        themeColors = {
          primary: '#ff7e00',
          secondary: '#ffb300',
          background: 'linear-gradient(135deg, #ff7e00, #ffb300)'
        };
        break;
      case 'weather-cloudy':
        themeColors = {
          primary: '#6a88a5',
          secondary: '#9bb5d3',
          background: 'linear-gradient(135deg, #6a88a5, #9bb5d3)'
        };
        break;
      case 'weather-rainy':
        themeColors = {
          primary: '#57606f',
          secondary: '#8395a7',
          background: 'linear-gradient(135deg, #57606f, #8395a7)'
        };
        break;
      case 'weather-thunderstorm':
        themeColors = {
          primary: '#2f3542',
          secondary: '#57606f',
          background: 'linear-gradient(135deg, #2f3542, #57606f)'
        };
        break;
      case 'weather-snow':
        themeColors = {
          primary: '#67809f',
          secondary: '#a5b1c2',
          background: 'linear-gradient(135deg, #67809f, #a5b1c2)'
        };
        break;
      case 'weather-mist':
        themeColors = {
          primary: '#a5b1c2',
          secondary: '#d1d8e0',
          background: 'linear-gradient(135deg, #a5b1c2, #d1d8e0)'
        };
        break;
      default:
        themeColors = this.defaultTheme;
    }

    this.themeColorsSubject.next(themeColors);
  }
}