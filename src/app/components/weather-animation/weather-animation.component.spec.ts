/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherAnimationComponent } from './weather-animation.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ElementRef } from '@angular/core';

describe('WeatherAnimationComponent', () => {
  let component: WeatherAnimationComponent;
  let fixture: ComponentFixture<WeatherAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ WeatherAnimationComponent, NoopAnimationsModule ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherAnimationComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    // Verifica se o componente de animação climática é instanciado corretamente
    expect(component).toBeTruthy();
  });

  it('deve inicializar com classe de clima vazia', () => {
    // Testa se o componente inicia sem nenhuma classe de clima definida
    expect(component.weatherClass).toBe('');
  });

  it('deve retornar contagem correta de partículas para clima chuvoso', () => {
    // Verifica se chuva gera 40 partículas para simular gotas
    component.weatherClass = 'weather-rainy';
    expect(component.getParticleCount()).toBe(40);
  });

  it('deve retornar contagem correta de partículas para clima nevado', () => {
    // Verifica se neve gera 30 partículas para simular flocos
    component.weatherClass = 'weather-snow';
    expect(component.getParticleCount()).toBe(30);
  });

  it('deve retornar contagem correta de partículas para tempestade', () => {
    // Verifica se tempestade gera 70 partículas para simular chuva intensa
    component.weatherClass = 'weather-thunderstorm';
    expect(component.getParticleCount()).toBe(70);
  });

  it('deve retornar zero partículas para outros tipos de clima', () => {
    // Testa se climas como sol não geram partículas de precipitação
    component.weatherClass = 'weather-sunny';
    expect(component.getParticleCount()).toBe(0);
  });

  it('deve mostrar partículas para clima chuvoso, nevado e tempestade', () => {
    // Verifica se apenas climas com precipitação mostram animações
    component.weatherClass = 'weather-rainy';
    expect(component.shouldShowParticles()).toBe(true);
    
    component.weatherClass = 'weather-snow';
    expect(component.shouldShowParticles()).toBe(true);
    
    component.weatherClass = 'weather-thunderstorm';
    expect(component.shouldShowParticles()).toBe(true);
  });

  it('não deve mostrar partículas para clima ensolarado', () => {
    component.weatherClass = 'weather-sunny';
    expect(component.shouldShowParticles()).toBe(false);
  });

  it('não deve mostrar partículas para clima nublado', () => {
    component.weatherClass = 'weather-cloudy';
    expect(component.shouldShowParticles()).toBe(false);
  });

  it('deve inicializar array de partículas quando clima muda', () => {
    // Testa se mudança de clima recria o array de partículas
    component.weatherClass = 'weather-rainy';
    component.ngOnChanges({
      weatherClass: {
        currentValue: 'weather-rainy',
        previousValue: '',
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.particlesArray.length).toBe(40);
  });

  it('deve inicializar raios solares para clima ensolarado', () => {
    // Verifica se clima de sol gera 12 raios para animação solar
    component.weatherClass = 'weather-sunny';
    component.ngOnChanges({
      weatherClass: {
        currentValue: 'weather-sunny',
        previousValue: '',
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.sunRaysArray.length).toBe(12);
  });

  it('não deve inicializar raios solares para clima não ensolarado', () => {
    component.weatherClass = 'weather-cloudy';
    component.ngOnChanges({
      weatherClass: {
        currentValue: 'weather-cloudy',
        previousValue: '',
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(component.sunRaysArray.length).toBe(0);
  });
});
