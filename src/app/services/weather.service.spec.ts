
/// <reference types="jasmine" />
import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IconService } from './icon.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;
  let iconServiceSpy: jasmine.SpyObj<IconService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('IconService', ['getWeatherIcon']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        WeatherService,
        { provide: IconService, useValue: spy }
      ]
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
    iconServiceSpy = TestBed.inject(IconService) as jasmine.SpyObj<IconService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve ser criado', () => {
    // Verifica se o serviço de clima é instanciado corretamente
    expect(service).toBeTruthy();
  });

  it('deve buscar dados meteorológicos', () => {
    // Testa se o serviço consegue buscar dados da API e processá-los corretamente
    const mockApiResponse = {
      forecastDays: [
        {
          displayDate: { year: 2023, month: 9, day: 15 },
          daytimeForecast: {
            weatherCondition: { type: 'CLEAR' },
            relativeHumidity: 60,
            wind: { speed: { value: 10 } },
            precipitation: { probability: { percent: 20 } }
          },
          minTemperature: { degrees: 15 },
          maxTemperature: { degrees: 25 }
        }
      ]
    };

    iconServiceSpy.getWeatherIcon.and.returnValue('clear_day.svg');

    service.getWeatherData(40.7128, -74.0060).subscribe(data => {
      expect(data.currentDay).toBeTruthy();
      expect(data.currentDay.date).toBe('2023-09-15');
      expect(data.currentDay.weatherCondition).toBe('Céu Limpo');
      expect(data.currentDay.temperature.min).toBe(15);
      expect(data.currentDay.temperature.max).toBe(25);
    });

    const req = httpMock.expectOne((request) => 
      request.url.includes(`location.latitude=40.7128&location.longitude=-74.006`)
    );
    req.flush(mockApiResponse);
  });

  it('deve tratar erros da API', (done) => {
    // Verifica se erros da API são tratados e transformados em mensagens amigáveis
    const errorResponse = new ErrorEvent('API error', {
      message: 'Erro de conexão'
    });

    service.getWeatherData(40.7128, -74.006).subscribe({
      error: (err) => {
        expect(err.message).toContain('Http failure response');
        done();
      }
    });

    const req = httpMock.expectOne((request) => 
      request.url.includes(`location.latitude=40.7128&location.longitude=-74.006`)
    );
    req.error(errorResponse);
  });
});
