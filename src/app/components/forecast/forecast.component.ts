import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherDay } from '../../models/weather.model';
import { WeatherIconComponent } from '../weather-icon/weather-icon.component';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, WeatherIconComponent],
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
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
  ]
})
export class ForecastComponent {
  @Input() forecast: WeatherDay[] = [];

  formatDay(date: string): string {
    const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    
    // Parse da data em formato YYYY-MM-DD para evitar problemas de timezone
    const [year, month, day] = date.split('-').map(Number);
    const dayDate = new Date(year, month - 1, day);
    
    const today = new Date();
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    if (dayDate.getTime() === todayDate.getTime()) {
      return 'Hoje';
    }
    
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    if (dayDate.getTime() === tomorrow.getTime()) {
      return 'Amanhã';
    }
    
    return dayNames[dayDate.getDay()];
  }
}