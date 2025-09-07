import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location.model';
import { of, throwError } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockLocationService: jasmine.SpyObj<LocationService>;

  beforeEach(async () => {
    mockLocationService = jasmine.createSpyObj('LocationService', ['searchLocation']);

    await TestBed.configureTestingModule({
      imports: [ SearchComponent ],
      providers: [
        { provide: LocationService, useValue: mockLocationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve ser criado', () => {
    // Verifica se o componente de busca é instanciado corretamente
    expect(component).toBeTruthy();
  });

  it('não deve buscar com termo de pesquisa vazio', () => {
    // Testa se a validação impede buscas com campo vazio
    component.searchTerm = '';
    component.searchLocation();
    
    expect(component.error).toBe('Por favor, digite o nome de uma cidade');
    expect(mockLocationService.searchLocation).not.toHaveBeenCalled();
  });

  it('deve buscar localizações com sucesso', () => {
    // Verifica se o componente processa corretamente resultados de busca
    const mockLocations: Location[] = [
      { 
        name: 'New York', 
        latitude: 40.7128, 
        longitude: -74.0060,
        country: 'US',
        state: 'NY'
      }
    ];

    component.searchTerm = 'New York';
    mockLocationService.searchLocation.and.returnValue(of(mockLocations));

    component.searchLocation();
    
    expect(component.locations).toEqual(mockLocations);
    expect(component.isLoading).toBeFalsy();
    expect(component.error).toBeNull();
  });

  it('deve tratar erros de pesquisa', (done) => {
    // Testa se erros de busca são capturados e tratados adequadamente
    component.searchTerm = 'Invalid City';
    mockLocationService.searchLocation.and.returnValue(throwError(() => new Error('Search failed')));

    component.searchLocation();
    
    setTimeout(() => {
      expect(component.locations).toEqual([]);
      expect(component.isLoading).toBeFalsy();
      expect(component.error).toBe('Falha ao buscar localização. Por favor, tente novamente.');
      done();
    }, 100);
  });

  it('deve tratar quando nenhuma localização for encontrada', () => {
    // Verifica se mensagem adequada é exibida quando busca não retorna resultados
    component.searchTerm = 'Nonexistent City';
    mockLocationService.searchLocation.and.returnValue(of([]));

    component.searchLocation();
    
    expect(component.locations).toEqual([]);
    expect(component.isLoading).toBeFalsy();
    expect(component.error).toBe('Nenhuma localização encontrada. Tente outra busca.');
  });

  it('deve selecionar uma localização', () => {
    // Testa se seleção de local emite evento e atualiza estado
    const mockLocation: Location = { 
      name: 'New York', 
      latitude: 40.7128, 
      longitude: -74.0060,
      country: 'US',
      state: 'NY'
    };

    const locationSelectedSpy = spyOn(component.locationSelected, 'emit');

    component.selectLocation(mockLocation);
    
    expect(locationSelectedSpy).toHaveBeenCalledWith(mockLocation);
    expect(component.locations).toEqual([]);
    expect(component.searchTerm).toBe(mockLocation.name);
  });

  it('deve limpar a pesquisa', () => {
    // Verifica se a função de limpeza reseta todos os campos
    component.searchTerm = 'Some City';
    component.locations = [{ 
      name: 'Some City', 
      latitude: 0, 
      longitude: 0,
      country: 'Test',
      state: 'TS'
    }];
    component.error = 'Some error';

    component.clearSearch();
    
    expect(component.searchTerm).toBe('');
    expect(component.locations).toEqual([]);
    expect(component.error).toBeNull();
  });
});
