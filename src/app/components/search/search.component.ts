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
  ],
  template: `
    <div class="search-container card">
      <h2>Procurar Localização</h2>
      <div class="search-form">
        <div class="input-wrapper">
          <span class="material-icons-round search-icon">search</span>
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            placeholder="Digite o nome da cidade..."
            (keyup.enter)="searchLocation()"
            class="search-input"
          >
          <span *ngIf="searchTerm" class="material-icons-round clear-icon" (click)="clearSearch()">close</span>
        </div>
        <button (click)="searchLocation()">
          <span class="material-icons-round">travel_explore</span>
          Buscar
        </button>
      </div>
      
      <div *ngIf="isLoading" class="loading" @fadeIn>
        <div class="loader"></div>
        <p>Buscando localizações...</p>
      </div>
      
      <div *ngIf="error" class="error-message" @fadeIn>
        <span class="material-icons-round error-icon">error_outline</span>
        <p>{{ error }}</p>
      </div>
      
      <div *ngIf="locations.length > 0" class="locations-list" @locationsList>
        <h3>Selecione uma localização:</h3>
        <ul [@listAnimation]="locations.length">
          <li *ngFor="let location of locations" 
              (click)="selectLocation(location)"
              class="location-item"
              @fadeIn>
            <div class="location-content">
              <span class="material-icons-round location-icon">location_on</span>
              <div class="location-text">
                <span class="location-name">{{ location.name }}</span>
                <span class="location-info">{{ location.state }}, {{ location.country }}</span>
              </div>
            </div>
            <span class="material-icons-round select-icon">arrow_forward_ios</span>
          </li>
        </ul>
      </div>
      
      <div *ngIf="!isLoading && !error && locations.length === 0 && !searchTerm" class="search-tip">
        <span class="material-icons-round tip-icon">lightbulb</span>
        <p>Digite o nome de uma cidade para ver a previsão do tempo.</p>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      margin-bottom: calc(var(--spacing-unit) * 3);
      overflow: hidden;
    }
    
    h2 {
      margin-bottom: calc(var(--spacing-unit) * 2);
      color: var(--text-color);
      font-weight: 600;
    }
    
    .search-form {
      display: flex;
      gap: var(--spacing-unit);
      margin-bottom: calc(var(--spacing-unit) * 2);
    }
    
    .input-wrapper {
      position: relative;
      flex: 1;
      display: flex;
      align-items: center;
    }
    
    .search-icon, .clear-icon {
      position: absolute;
      color: var(--text-muted);
      z-index: 1;
    }
    
    .search-icon {
      left: 12px;
    }
    
    .clear-icon {
      right: 12px;
      cursor: pointer;
      font-size: 18px;
      transition: color var(--transition-fast);
    }
    
    .clear-icon:hover {
      color: var(--error-color);
    }
    
    .search-input {
      padding-left: 40px;
      padding-right: 40px;
    }
    
    .loading, .error-message, .search-tip {
      margin-top: calc(var(--spacing-unit) * 2);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-unit);
    }
    
    .loader {
      width: 24px;
      height: 24px;
      border: 3px solid rgba(37, 99, 235, 0.2);
      border-top-color: var(--primary-color);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    
    .error-message {
      color: var(--error-color);
    }
    
    .error-icon {
      color: var(--error-color);
      font-size: 24px;
    }
    
    .locations-list {
      margin-top: calc(var(--spacing-unit) * 3);
    }
    
    h3 {
      margin-bottom: var(--spacing-unit);
      font-size: 1rem;
      color: var(--text-muted);
      font-weight: 500;
    }
    
    ul {
      list-style: none;
      border-radius: var(--border-radius);
      overflow: hidden;
    }
    
    .location-item {
      padding: calc(var(--spacing-unit) * 1.5);
      margin-bottom: var(--spacing-unit);
      background-color: var(--background-light);
      cursor: pointer;
      transition: background-color var(--transition-fast);
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-radius: var(--border-radius-sm);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .location-item:hover {
      background-color: rgba(37, 99, 235, 0.08);
    }
    
    .location-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-unit);
    }
    
    .location-icon {
      color: var(--primary-color);
    }
    
    .select-icon {
      font-size: 14px;
      color: var(--text-muted);
    }
    
    .location-text {
      display: flex;
      flex-direction: column;
    }
    
    .location-name {
      font-weight: 500;
      color: var(--text-color);
    }
    
    .location-info {
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    
    .search-tip {
      color: var(--text-muted);
      background-color: rgba(37, 99, 235, 0.05);
      padding: calc(var(--spacing-unit) * 2);
      border-radius: var(--border-radius-sm);
    }
    
    .tip-icon {
      color: var(--warning-color);
      font-size: 24px;
    }
    
    @media (max-width: 768px) {
      .search-form {
        flex-direction: column;
      }
      
      button {
        width: 100%;
      }
    }
  `]
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