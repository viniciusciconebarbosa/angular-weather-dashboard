import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="weather-icon" [style.width.px]="size" [style.height.px]="size">
      <img [src]="iconUrl" [alt]="condition" [style.width.px]="size" [style.height.px]="size">
    </div>
  `,
  styles: [`
    .weather-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      color: inherit;
    }

    :host-context(.current-weather) img {
      color: white;
    }

    :host-context(.forecast-day) img {
      color: var(--text-color);
    }
  `]
})
export class WeatherIconComponent {
  @Input() condition: string = '';
  @Input() size: number = 24;
  @Input() iconUrl: string = '';
}