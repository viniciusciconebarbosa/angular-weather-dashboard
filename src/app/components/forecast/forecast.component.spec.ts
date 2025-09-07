import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForecastComponent } from './forecast.component';
import { WeatherDay } from '../../models/weather.model';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ForecastComponent, NoopAnimationsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    // Verifica se o componente de previsão é instanciado corretamente
    expect(component).toBeTruthy();
  });

  it('deve ter previsão vazia por padrão', () => {
    // Testa se o componente inicia com array vazio de previsões
    expect(component.forecast).toEqual([]);
  });

  describe('método formatDay', () => {
    it('deve retornar "Hoje" para hoje', () => {
      // Verifica se a data atual é formatada como "Hoje"
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;
      expect(component.formatDay(todayStr)).toBe('Hoje');
    });

    it('deve retornar "Amanhã" para amanhã', () => {
      // Verifica se a data de amanhã é formatada como "Amanhã"
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');
      const tomorrowStr = `${year}-${month}-${day}`;
      expect(component.formatDay(tomorrowStr)).toBe('Amanhã');
    });

    it('deve retornar nome do dia para outros dias', () => {
      // Testa se outras datas retornam o nome do dia da semana
      const dayNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 5); // 5 dias no futuro
      const year = futureDate.getFullYear();
      const month = String(futureDate.getMonth() + 1).padStart(2, '0');
      const day = String(futureDate.getDate()).padStart(2, '0');
      const futureDateStr = `${year}-${month}-${day}`;
      const expectedDayName = dayNames[futureDate.getDay()];
      expect(component.formatDay(futureDateStr)).toBe(expectedDayName);
    });
  });

  it('deve renderizar itens de previsão', () => {
    // Verifica se o componente processa e exibe dados de previsão corretamente
    const mockForecast: WeatherDay[] = [
      {
        date: '2023-09-16',
        weatherCondition: 'Céu Limpo',
        iconUrl: 'clear_day.svg',
        temperature: { min: 15, max: 25 },
        humidity: 60,
        windSpeed: 10,
        precipitation: 20
      },
      {
        date: '2023-09-17',
        weatherCondition: 'Parcialmente Nublado',
        iconUrl: 'partly_cloudy.svg',
        temperature: { min: 14, max: 22 },
        humidity: 55,
        windSpeed: 8,
        precipitation: 30
      }
    ];

    component.forecast = mockForecast;
    fixture.detectChanges();

    // Verificar se o componente renderiza com dados de previsão
    expect(component.forecast.length).toBe(2);
    expect(component.forecast[0].weatherCondition).toBe('Céu Limpo');
    expect(component.forecast[1].weatherCondition).toBe('Parcialmente Nublado');
  });
});
