import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeColors } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header [style.background]="headerBackground">
      <div class="container header-container">
        <div class="logo">
          <span class="material-icons-round logo-icon">cloud</span>
          <h1>Previsão<span class="accent">Tempo</span></h1>
        </div>
      </div>
      <div class="wave-container">
        <svg class="wave" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ffffff" d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"></path>
        </svg>
      </div>
    </header>
  `,
  styles: [`
    header {
      color: var(--text-light);
      padding: calc(var(--spacing-unit) * 3) 0 0;
      box-shadow: 0 2px 5px var(--shadow-color);
      transition: background 0.5s ease-in-out;
      position: relative;
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: calc(var(--spacing-unit) * 3);
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: var(--spacing-unit);
    }
    
    .logo-icon {
      font-size: 28px;
      animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
    
    h1 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: 0.01em;
    }
    
    .accent {
      font-weight: 400;
      opacity: 0.9;
    }
    
    .wave-container {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
    }
    
    .wave {
      display: block;
      width: 100%;
      height: 40px;
    }
    
    @media (max-width: 768px) {
      h1 {
        font-size: 1.2rem;
      }
      
      .logo-icon {
        font-size: 24px;
      }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerBackground: string = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
  private themeSubscription?: Subscription;
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit(): void {
    this.themeSubscription = this.themeService.themeColors$.subscribe(
      (colors: ThemeColors) => {
        this.headerBackground = `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`;
      }
    );
  }
  
  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}