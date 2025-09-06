import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('locationsList', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(10px)' }),
          stagger(80, [
            animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class SearchComponent {
  @Output() locationSelected = new EventEmitter<Location>();
  
  searchTerm = '';
  isLoading = false;
  error: string | null = null;
  locations: Location[] = [];

  constructor(private locationService: LocationService) {}

  searchLocation(): void {
    if (!this.searchTerm.trim()) {
      this.error = 'Por favor, digite o nome de uma cidade';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.locations = [];

    this.locationService.searchLocation(this.searchTerm)
      .subscribe({
        next: (locations) => {
          this.locations = locations;
          this.isLoading = false;
          
          if (locations.length === 0) {
            this.error = 'Nenhuma localização encontrada. Tente outra busca.';
          }
        },
        error: (err) => {
          console.error('Error searching for location', err);
          this.error = 'Falha ao buscar localização. Por favor, tente novamente.';
          this.isLoading = false;
        }
      });
  }

  selectLocation(location: Location): void {
    this.locationSelected.emit(location);
    this.locations = [];
    this.searchTerm = location.name;
  }
  
  clearSearch(): void {
    this.searchTerm = '';
    this.locations = [];
    this.error = null;
  }
}