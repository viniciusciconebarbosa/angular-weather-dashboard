import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../components/search/search.component';
import { CurrentWeatherComponent } from '../../components/current-weather/current-weather.component';
import { ForecastComponent } from '../../components/forecast/forecast.component';
import { LocationService } from '../../services/location.service';
import { WeatherService } from '../../services/weather.service';
import { Location } from '../../models/location.model';
import { WeatherData } from '../../models/weather.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    CurrentWeatherComponent,
    ForecastComponent
  ],
  template: `
    <div class="container">
      <app-search 
        (locationSelected)="onLocationSelected($event)"
      ></app-search>
      
      <div *ngIf="isLoading" class="loading">
        <p>Loading weather data...</p>
      </div>
      
      <div *ngIf="error" class="error-message card">
        <p>{{ error }}</p>
      </div>
      
      <div *ngIf="weatherData && !isLoading" class="weather-container fade-in">
        <app-current-weather 
          [currentWeather]="weatherData.currentDay"
          [location]="selectedLocation"
        ></app-current-weather>
        
        <app-forecast 
          [forecast]="weatherData.forecast"
        ></app-forecast>
      </div>
    </div>
  `,
  styles: [`
    .loading {
      text-align: center;
      padding: calc(var(--spacing-unit) * 4);
      color: var(--text-muted);
    }
    
    .error-message {
      background-color: #ffebee;
      color: var(--error-color);
      text-align: center;
    }
    
    .weather-container {
      margin-top: calc(var(--spacing-unit) * 3);
    }
  `]
})
export class HomeComponent implements OnInit {
  isLoading = false;
  error: string | null = null;
  selectedLocation: Location | null = null;
  weatherData: WeatherData | null = null;

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    // Try to load saved location
    const savedLocation = this.locationService.getSavedLocation();
    if (savedLocation) {
      this.selectedLocation = savedLocation;
      this.loadWeatherData(savedLocation);
    }
  }

  onLocationSelected(location: Location): void {
    this.selectedLocation = location;
    this.locationService.saveLocation(location);
    this.loadWeatherData(location);
  }

  private loadWeatherData(location: Location): void {
    this.isLoading = true;
    this.error = null;
    
    this.weatherService.getWeatherData(location.latitude, location.longitude)
      .subscribe({
        next: (data) => {
          this.weatherData = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching weather data', err);
          this.error = 'Failed to load weather data. Please try again.';
          this.isLoading = false;
        }
      });
  }
}