/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherIconComponent } from './weather-icon.component';

describe('WeatherIconComponent', () => {
  let component: WeatherIconComponent;
  let fixture: ComponentFixture<WeatherIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ WeatherIconComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherIconComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    // Verifica se o componente de ícone climático é instanciado corretamente
    expect(component).toBeTruthy();
  });

  it('deve inicializar com valores padrão', () => {
    // Testa se o componente inicia com valores padrão (vazio, tamanho 24)
    expect(component.condition).toBe('');
    expect(component.size).toBe(24);
    expect(component.iconUrl).toBe('');
  });

  it('deve aceitar entrada de condição', () => {
    // Verifica se o componente aceita e armazena condições climáticas
    const testCondition = 'sunny';
    component.condition = testCondition;
    
    expect(component.condition).toBe(testCondition);
  });

  it('deve aceitar entrada de tamanho', () => {
    // Testa se o componente aceita diferentes tamanhos de ícone
    const testSize = 48;
    component.size = testSize;
    
    expect(component.size).toBe(testSize);
  });

  it('deve aceitar entrada de URL do ícone', () => {
    // Verifica se o componente aceita URLs de ícones personalizados
    const testIconUrl = 'assets/images/clear_day.svg';
    component.iconUrl = testIconUrl;
    
    expect(component.iconUrl).toBe(testIconUrl);
  });

  it('deve renderizar com entradas fornecidas', () => {
    // Testa se o componente renderiza corretamente com dados fornecidos
    component.condition = 'Clear Sky';
    component.size = 32;
    component.iconUrl = 'assets/images/clear_day.svg';
    
    fixture.detectChanges();
    
    expect(component.condition).toBe('Clear Sky');
    expect(component.size).toBe(32);
    expect(component.iconUrl).toBe('assets/images/clear_day.svg');
  });

  it('deve lidar com entradas vazias graciosamente', () => {
    // Verifica se o componente funciona mesmo com valores vazios
    component.condition = '';
    component.size = 0;
    component.iconUrl = '';
    
    fixture.detectChanges();
    
    expect(component.condition).toBe('');
    expect(component.size).toBe(0);
    expect(component.iconUrl).toBe('');
  });

  it('deve lidar com valores de tamanho grandes', () => {
    // Testa se o componente aceita tamanhos grandes de ícone
    component.size = 128;
    
    expect(component.size).toBe(128);
  });

  it('deve lidar com várias condições climáticas', () => {
    // Verifica se o componente processa diferentes tipos de clima
    const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'thunderstorm'];
    
    conditions.forEach(condition => {
      component.condition = condition;
      expect(component.condition).toBe(condition);
    });
  });
});
