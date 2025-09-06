import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss']
})
export class WeatherIconComponent {
  @Input() condition: string = '';
  @Input() size: number = 24;
  @Input() iconUrl: string = '';
}