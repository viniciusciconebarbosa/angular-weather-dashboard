/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentWeatherComponent } from './current-weather.component';
import { ThemeService } from '../../services/theme.service';
import { WeatherDay } from '../../models/weather.model';
import { Location } from '../../models/location.model';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;

  beforeEach(async () => {
    mockThemeService = jasmine.createSpyObj('ThemeService', ['setThemeColors']);

    await TestBed.configureTestingModule({
      imports: [ CurrentWeatherComponent, NoopAnimationsModule ],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    // Verifica se o componente de clima atual é instanciado corretamente
    expect(component).toBeTruthy();
  });

  it('deve obter data atual em formato português', () => {
    // Testa se a data é formatada corretamente em português brasileiro
    const currentDate = component.getCurrentDate();
    expect(currentDate).toContain('2025'); // Assuming current year
    expect(typeof currentDate).toBe('string');
  });

  it('deve retornar classe correta para condições ensolaradas', () => {
    // Verifica se condições de sol retornam a classe CSS apropriada
    component.currentWeather = {
      date: '2023-09-16',
      weatherCondition: 'Céu Limpo',
      iconUrl: 'clear_day.svg',
      temperature: { min: 15, max: 25 },
      humidity: 60,
      windSpeed: 10,
      precipitation: 20
    };

    expect(component.getWeatherClass()).toBe('weather-sunny');
  });

  it('deve retornar classe correta para condições nubladas', () => {
    // Verifica se condições nubladas retornam a classe CSS apropriada
    component.currentWeather = {
      date: '2023-09-16',
      weatherCondition: 'Nublado',
      iconUrl: 'cloudy.svg',
      temperature: { min: 15, max: 25 },
      humidity: 60,
      windSpeed: 10,
      precipitation: 20
    };

    expect(component.getWeatherClass()).toBe('weather-cloudy');
  });

  it('deve retornar classe correta para condições chuvosas', () => {
    // Verifica se condições de chuva retornam a classe CSS apropriada
    component.currentWeather = {
      date: '2023-09-16',
      weatherCondition: 'Chuva',
      iconUrl: 'rainy.svg',
      temperature: { min: 15, max: 25 },
      humidity: 60,
      windSpeed: 10,
      precipitation: 20
    };

    expect(component.getWeatherClass()).toBe('weather-rainy');
  });

  it('deve atualizar classe do clima ao mudar', () => {
    // Testa se mudanças nos dados do clima atualizam a classe e tema
    const mockWeather: WeatherDay = {
      date: '2023-09-16',
      weatherCondition: 'Céu Limpo',
      iconUrl: 'clear_day.svg',
      temperature: { min: 15, max: 25 },
      humidity: 60,
      windSpeed: 10,
      precipitation: 20
    };

    component.currentWeather = mockWeather;
    component.ngOnChanges({
      currentWeather: {
        currentValue: mockWeather,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    });

    expect(component.weatherClass).toBe('weather-sunny');
    expect(mockThemeService.setThemeColors).toHaveBeenCalledWith('weather-sunny');
  });

  it('deve lidar com entrada de localização', () => {
    // Verifica se o componente aceita e processa dados de localização
    const mockLocation: Location = {
      name: 'São Paulo',
      latitude: -23.5505,
      longitude: -46.6333,
      country: 'BR',
      state: 'SP'
    };

    component.location = mockLocation;
    expect(component.location).toEqual(mockLocation);
  });
});
