import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDay } from '../../models/weather.model';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';
import { trigger, transition, style, animate, state, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, WeatherIconComponent],
  animations: [
    trigger('forecastItem', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(60, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true }),
        query(':leave', [
          stagger(60, [
            animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <div class="forecast-container card">
      <div class="header">
        <span class="material-icons-round header-icon">date_range</span>
        <h2>Previsão para os Próximos Dias</h2>
      </div>
      
      <div class="forecast-list" [@listAnimation]="forecast.length">
        <div *ngFor="let day of forecast; let i = index" 
             class="forecast-day"
             [@forecastItem]>
          <div class="day-name">{{ formatDay(day.date) }}</div>
          <div class="day-icon">
            <app-weather-icon [condition]="day.weatherCondition" [iconUrl]="day.iconUrl" [size]="40"></app-weather-icon>
          </div>
          <div class="day-condition">{{ day.weatherCondition }}</div>
          <div class="day-temp">
            <div class="temp-item">
              
              <span class="max">{{ day.temperature.max | number:'1.0-0' }}°</span>
            </div>
            <div class="temp-item">
              
              <span class="min">{{ day.temperature.min | number:'1.0-0' }}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .forecast-container {
      background-color: var(--background-card);
      border-radius: var(--border-radius);
    }
    
    .header {
      display: flex;
      align-items: center;
      gap: var(--spacing-unit);
      margin-bottom: calc(var(--spacing-unit) * 3);
    }
    
    .header-icon {
      color: var(--primary-color);
      font-size: 24px;
    }
    
    h2 {
      color: var(--text-color);
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      margin: 0;
    }
    
    .forecast-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    
    .forecast-day {
      display: grid;
      grid-template-columns: 1fr 60px 2fr 1.5fr;
      align-items: center;
      padding: calc(var(--spacing-unit) * 2) 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      transition: background-color var(--transition-fast);
    }
    
    .forecast-day:hover {
      background-color: rgba(0, 0, 0, 0.02);
    }
    
    .forecast-day:last-child {
      border-bottom: none;
    }
    
    .day-name {
      font-weight: 600;
      color: var(--text-color);
    }
    
    .day-icon {
      display: flex;
      justify-content: center;
    }
    
    .day-condition {
      color: var(--text-muted);
      font-size: 0.95rem;
      padding-left: var(--spacing-unit);
    }
    
    .day-temp {
      display: flex;
      flex-direction: column;
      gap: calc(var(--spacing-unit));
      justify-content: center;
      align-items: flex-end;
    }
    
    .temp-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .temp-icon {
      font-size: 16px;
    }
    
    .temp-icon:first-child {
      color:rgb(239, 156, 68);
    }
    
    .temp-icon:last-child {
      color: #3b82f6;
    }
    
    .max {
      font-weight: 600;
      color:rgb(239, 156, 68);
    }
    
    .min {
      color: #3b82f6;
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .forecast-day {
        grid-template-columns: 1fr 50px 1fr;
        grid-template-rows: auto auto;
        gap: var(--spacing-unit);
        padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit));
      }
      
      .day-condition {
        grid-column: 1 / -1;
        grid-row: 2;
        padding-left: 0;
      }
      
      .day-temp {
        flex-direction: row;
        justify-content: flex-end;
        gap: calc(var(--spacing-unit) * 2);
      }
    }
  `]
})
export class ForecastComponent {
  @Input() forecast: WeatherDay[] = [];

  formatDay(date: string): string {
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const dayDate = new Date(date);
    
    // If it's today, return "Today" instead of the day name
    const today = new Date();
    if (dayDate.toDateString() === today.toDateString()) {
      return 'Hoje';
    }
    
    // If it's tomorrow, return "Tomorrow"
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (dayDate.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    }
    
    return dayNames[dayDate.getDay()];
  }
}