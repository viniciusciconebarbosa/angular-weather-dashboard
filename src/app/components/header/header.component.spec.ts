/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ThemeService, ThemeColors } from '../../services/theme.service';
import { BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockThemeService: jasmine.SpyObj<ThemeService>;
  let themeColorsSubject: BehaviorSubject<ThemeColors>;

  beforeEach(async () => {
    themeColorsSubject = new BehaviorSubject<ThemeColors>({
      background: 'linear-gradient(135deg, #74b9ff, #0984e3)',
      primary: '#74b9ff',
      secondary: '#0984e3'
    });

    mockThemeService = jasmine.createSpyObj('ThemeService', [], {
      themeColors$: themeColorsSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [ HeaderComponent ],
      providers: [
        { provide: ThemeService, useValue: mockThemeService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('deve ser criado', () => {
    // Verifica se o componente de cabeçalho é instanciado corretamente
    expect(component).toBeTruthy();
  });

  it('deve inicializar com fundo padrão do cabeçalho', () => {
    // Testa se o componente inicia com fundo vazio (antes da subscrição)
    expect(component.headerBackground).toBe('');
  });

  it('deve se inscrever nas cores do tema na inicialização', () => {
    // Verifica se o componente se conecta ao serviço de tema ao inicializar
    component.ngOnInit();
    
    expect(component.headerBackground).toBe('linear-gradient(135deg, #74b9ff, #0984e3)');
  });

  it('deve atualizar fundo do cabeçalho quando tema muda', () => {
    // Testa se mudanças no tema atualizam o fundo do cabeçalho automaticamente
    component.ngOnInit();
    
    const newThemeColors: ThemeColors = {
      background: 'linear-gradient(135deg, #ff7675, #d63031)',
      primary: '#ff7675',
      secondary: '#d63031'
    };

    themeColorsSubject.next(newThemeColors);
    
    expect(component.headerBackground).toBe('linear-gradient(135deg, #ff7675, #d63031)');
  });

  it('deve cancelar inscrição ao destruir', () => {
    // Verifica se a subscrição é cancelada para evitar vazamentos de memória
    component.ngOnInit();
    expect(component['themeSubscription']).toBeDefined();
    
    spyOn(component['themeSubscription']!, 'unsubscribe');
    component.ngOnDestroy();
    
    expect(component['themeSubscription']!.unsubscribe).toHaveBeenCalled();
  });

  it('deve lidar com destruição quando inscrição é indefinida', () => {
    // Testa robustez ao destruir componente sem subscrição ativa
    component['themeSubscription'] = undefined;
    
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
