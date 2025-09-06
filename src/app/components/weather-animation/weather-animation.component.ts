import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-weather-animation',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', [
        animate('1s ease-in-out')
      ])
    ])
  ],
  template: `
    <div class="animation-container">
      <div class="particles-container" *ngIf="shouldShowParticles()" [@fadeInOut]>
        <div class="particle" *ngFor="let i of particlesArray" [ngClass]="weatherClass"></div>
      </div>
      <div class="lightning-container" *ngIf="weatherClass === 'weather-thunderstorm'" [@fadeInOut]>
        <div class="lightning"></div>
        <div class="lightning-bolt"></div>
        <div class="lightning-bolt lightning-bolt-2"></div>
      </div>
      <div class="clouds-container">
        <div class="cloud cloud-1" [class.active]="weatherClass === 'weather-cloudy' || weatherClass === 'weather-mist' || weatherClass === 'weather-thunderstorm'">
          <div class="cloud-part cloud-circle-1"></div>
          <div class="cloud-part cloud-circle-2"></div>
          <div class="cloud-part cloud-circle-3"></div>
          <div class="cloud-part cloud-circle-4"></div>
          <div class="cloud-part cloud-rect"></div>
        </div>
        <div class="cloud cloud-2" [class.active]="weatherClass === 'weather-cloudy' || weatherClass === 'weather-mist' || weatherClass === 'weather-thunderstorm'">
          <div class="cloud-part cloud-circle-1"></div>
          <div class="cloud-part cloud-circle-2"></div>
          <div class="cloud-part cloud-circle-3"></div>
          <div class="cloud-part cloud-circle-4"></div>
          <div class="cloud-part cloud-rect"></div>
        </div>
        <div class="cloud cloud-3" [class.active]="weatherClass === 'weather-cloudy' || weatherClass === 'weather-mist' || weatherClass === 'weather-thunderstorm'">
          <div class="cloud-part cloud-circle-1"></div>
          <div class="cloud-part cloud-circle-2"></div>
          <div class="cloud-part cloud-circle-3"></div>
          <div class="cloud-part cloud-rect"></div>
        </div>
      </div>
      <div class="sun-container" [class.visible]="weatherClass === 'weather-sunny'" [@fadeInOut]>
        <div class="sun"></div>
        <div class="sun-ray" *ngFor="let i of sunRaysArray"></div>
      </div>
      <div class="fog-container" [class.visible]="weatherClass === 'weather-mist'" [@fadeInOut]>
        <div class="fog-layer fog-layer-1"></div>
        <div class="fog-layer fog-layer-2"></div>
        <div class="fog-layer fog-layer-3"></div>
      </div>
    </div>
  `,
  styles: [`
    .animation-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      pointer-events: none;
      z-index: 0;
    }
    
    .particles-container {
      position: absolute;
      top: -10px;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    
    @keyframes fade-out {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    
    .particle {
      position: absolute;
      width: 3px;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      top: -10px;
      animation: fall linear infinite;
      filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
    }
    
    .lightning-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .lightning {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0);
      animation: lightning-flash 6s infinite;
    }
    
    .lightning-bolt {
      position: absolute;
      top: 20%;
      left: 30%;
      width: 3px;
      height: 0;
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 15px 2px rgba(255, 255, 255, 0.8),
                  0 0 30px 4px rgba(200, 220, 255, 0.6);
      transform-origin: top;
      animation: lightning-strike 6s infinite;
      opacity: 0;
      z-index: 3;
    }
    
    .lightning-bolt-2 {
      top: 15%;
      left: 65%;
      animation-delay: 2.5s;
    }
    
    @keyframes lightning-strike {
      0%, 95.5%, 98.5%, 100% {
        opacity: 0;
        height: 0;
      }
      96%, 96.6% {
        opacity: 1;
        height: 250px;
        transform: rotate(10deg) translateX(0);
      }
      96.1%, 96.5% {
        transform: rotate(12deg) translateX(5px);
      }
      96.2%, 96.4% {
        transform: rotate(8deg) translateX(-5px);
      }
      97%, 98% {
        opacity: 0.5;
        height: 200px;
      }
    }
    
    .clouds-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .cloud {
      position: absolute;
      width: 180px;
      height: 70px;
      opacity: 0;
      left: -200px;
      transition: opacity 0.8s ease-in-out;
      visibility: hidden;
    }
    
    .cloud.active {
      opacity: 1;
      visibility: visible;
      animation-name: cloud-move;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
    }
    
    .cloud-part {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.7);
      filter: blur(1px);
    }
    
    .cloud-circle-1 {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      top: 5px;
      left: 20px;
    }
    
    .cloud-circle-2 {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      top: 0;
      left: 45px;
    }
    
    .cloud-circle-3 {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      top: 3px;
      left: 85px;
    }
    
    .cloud-circle-4 {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      top: 10px;
      left: 120px;
    }
    
    .cloud-rect {
      width: 125px;
      height: 25px;
      border-radius: 12px;
      top: 27px;
      left: 20px;
    }
    
    .cloud-1 {
      top: 15%;
      animation-duration: 60s;
    }
    
    .cloud-2 {
      top: 40%;
      animation-duration: 80s;
    }
    
    .cloud-3 {
      top: 65%;
      animation-duration: 70s;
    }
    
    @keyframes cloud-move {
      0% {
        left: -200px;
      }
      100% {
        left: 100%;
      }
    }
    
    @keyframes lightning-flash {
      0%, 95%, 98%, 100% {
        opacity: 0;
        background-color: rgba(255, 255, 255, 0);
      }
      96%, 97% {
        opacity: 0.3;
        background-color: rgba(255, 255, 255, 0.5);
      }
    }
    
    @keyframes fall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      85% {
        opacity: 0.9;
      }
      100% {
        transform: translateY(400px) rotate(360deg);
        opacity: 0;
      }
    }
    
    .weather-rainy {
      width: 4px;
      height: 10px;
      border-radius: 2px;
      animation-duration: 0.8s;
      animation-name: rain;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(195, 215, 255, 0.6));
      box-shadow: 0 0 4px rgba(255, 255, 255, 0.4);
    }
    
    @keyframes rain {
      0% {
        transform: translateY(0) rotate(20deg);
      }
      100% {
        transform: translateY(400px) rotate(20deg);
      }
    }
    
    .weather-thunderstorm {
      width: 2px;
      height: 30px;
      border-radius: 1px;
      animation-duration: 0.7s;
      animation-name: thunderstorm-rain;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(169, 201, 255, 0.6));
      box-shadow: 0 0 5px rgba(255, 255, 255, 0.6), 0 0 2px rgba(200, 220, 255, 0.8);
    }
    
    @keyframes thunderstorm-rain {
      0% {
        transform: translateY(0) rotate(10deg) translateX(0);
        opacity: 0.9;
      }
      50% {
        transform: translateY(200px) rotate(20deg) translateX(-10px);
        opacity: 0.9;
        height: 35px;
      }
      75% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(400px) rotate(25deg) translateX(-15px);
        opacity: 0;
        height: 20px;
      }
    }
    
    .weather-snow {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation-name: snow;
      animation-duration: 3s;
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), inset 0 0 4px rgba(255, 255, 255, 0.7);
    }
    
    @keyframes snow {
      0% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(200px) rotate(180deg) translateX(20px);
      }
      100% {
        transform: translateY(400px) rotate(360deg) translateX(-20px);
      }
    }
    
    .sun-container {
      position: absolute;
      top: 15%;
      right: 15%;
      width: 80px;
      height: 80px;
      z-index: 1;
    }
    
    .sun {
      position: absolute;
      width: 60px;
      height: 60px;
      background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 244, 214, 0.8) 70%);
      border-radius: 50%;
      top: 10px;
      left: 10px;
      animation: sun-pulse 5s ease-in-out infinite;
      opacity: 0;
      box-shadow: 0 0 40px rgba(255, 179, 0, 0.57);
      animation: fade-in 1.5s forwards, sun-pulse 5s 1.5s ease-in-out infinite;
    }
    
    .sun-ray {
      position: absolute;
      top: 40px;
      left: 40px;
      width: 2px;
      height: 30px;
      background-color: rgba(255, 255, 255, 0.8);
      transform-origin: 0 0;
      opacity: 0;
      animation: fade-in 1.5s forwards, sun-ray-pulse 4s 1.5s ease-in-out infinite;
    }
    
    .fog-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    
    .fog-layer {
      position: absolute;
      width: 200%;
      height: 25px;
      background: linear-gradient(to right, 
        rgba(255, 255, 255, 0) 0%, 
        rgba(255, 255, 255, 0.3) 25%, 
        rgba(255, 255, 255, 0.3) 50%, 
        rgba(255, 255, 255, 0.3) 75%, 
        rgba(255, 255, 255, 0) 100%);
      opacity: 0;
      animation: fade-in 2s forwards;
      filter: blur(2px);
    }
    
    .fog-layer-1 {
      top: 30%;
      animation: fade-in 2s forwards, fog-move-1 30s 2s linear infinite;
    }
    
    .fog-layer-2 {
      top: 50%;
      animation: fade-in 2s forwards 0.5s, fog-move-2 40s 2.5s linear infinite;
    }
    
    .fog-layer-3 {
      top: 70%;
      animation: fade-in 2s forwards 1s, fog-move-3 50s 3s linear infinite;
    }
    
    @keyframes sun-pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0.9;
      }
      50% {
        transform: scale(1.1);
        opacity: 1;
        box-shadow: 0 0 60px rgba(255, 180, 0, 0.8);
      }
    }
    
    @keyframes sun-ray-pulse {
      0%, 100% {
        opacity: 0.6;
        height: 30px;
      }
      50% {
        opacity: 0.9;
        height: 40px;
      }
    }
    
    @keyframes fog-move-1 {
      0% {
        left: -200%;
      }
      100% {
        left: 0;
      }
    }
    
    @keyframes fog-move-2 {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }
    
    @keyframes fog-move-3 {
      0% {
        left: 0;
      }
      100% {
        left: -200%;
      }
    }
  `]
})
export class WeatherAnimationComponent implements OnChanges, AfterViewInit, OnInit {
  @Input() weatherClass: string = '';
  
  particlesArray: number[] = [];
  sunRaysArray: number[] = [];
  
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit() {
    // Garantir que as nuvens estejam posicionadas fora da tela antes de qualquer animação
    this.resetCloudPositions();
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.distributeParticles();
      this.distributeSunRays();
      this.updateClouds();
    }, 100);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['weatherClass']) {
      // Resetar a posição das nuvens antes de mudar a classe de clima
      this.resetCloudPositions();
      
      this.initializeParticles();
      this.initializeSunRays();
      
      setTimeout(() => {
        this.distributeParticles();
        this.distributeSunRays();
        this.updateClouds();
      }, 100);
    }
  }
  
  private resetCloudPositions() {
    // Garantir que todas as nuvens comecem fora da tela
    const clouds = this.elementRef.nativeElement.querySelectorAll('.cloud');
    if (clouds && clouds.length) {
      clouds.forEach((cloud: Element) => {
        const htmlElement = cloud as HTMLElement;
        htmlElement.style.left = '-200px';
      });
    }
  }
  
  private initializeParticles() {
    const particleCount = this.getParticleCount();
    this.particlesArray = Array(particleCount).fill(0).map((_, i) => i);
  }
  
  private initializeSunRays() {
    if (this.weatherClass === 'weather-sunny') {
      this.sunRaysArray = Array(12).fill(0).map((_, i) => i);
    } else {
      this.sunRaysArray = [];
    }
  }
  
  private distributeParticles() {
    const particles = this.elementRef.nativeElement.querySelectorAll('.particle');
    
    particles.forEach((particle: Element) => {
      const htmlElement = particle as HTMLElement;
      htmlElement.style.left = `${Math.random() * 100}%`;
      htmlElement.style.animationDelay = `${Math.random() * 5}s`;
      htmlElement.style.animationDuration = `${1 + Math.random() * 3}s`;
    });
  }
  
  private distributeSunRays() {
    const rays = this.elementRef.nativeElement.querySelectorAll('.sun-ray');
    
    rays.forEach((ray: Element, index: number) => {
      const htmlElement = ray as HTMLElement;
      const angle = (index / rays.length) * 360;
      htmlElement.style.transform = `rotate(${angle}deg)`;
      htmlElement.style.animationDelay = `${index * 0.3}s`;
    });
  }
  
  private updateClouds() {
    const clouds = this.elementRef.nativeElement.querySelectorAll('.cloud');
    
    clouds.forEach((cloud: Element, index: number) => {
      const htmlElement = cloud as HTMLElement;
      
      // Set random opacity for cloud parts
      const opacity = 0.5 + Math.random() * 0.3;
      htmlElement.querySelectorAll('.cloud-part').forEach((part: Element) => {
        (part as HTMLElement).style.opacity = opacity.toString();
      });
      
      // Set random scale for cloud
      const scale = 1.0 + Math.random() * 0.5;
      htmlElement.style.transform = `scale(${scale})`;
      
      // Set random vertical position with a fixed offset between clouds
      const verticalSpacing = 25;
      htmlElement.style.top = `${10 + (index * verticalSpacing) + (Math.random() * 10 - 5)}%`;
      
      // Definir atrasos diferentes para cada nuvem para movimento escalonado
      if (this.weatherClass === 'weather-cloudy' || this.weatherClass === 'weather-mist' || this.weatherClass === 'weather-thunderstorm') {
        htmlElement.style.animationDelay = `${0.5 + index * 0.8}s`;
      }
    });
  }
  
  shouldShowParticles(): boolean {
    return ['weather-rainy', 'weather-snow', 'weather-thunderstorm'].includes(this.weatherClass);
  }
  
  getParticleCount(): number {
    switch (this.weatherClass) {
      case 'weather-rainy':
        return 40;
      case 'weather-snow':
        return 30;
      case 'weather-thunderstorm':
        return 70;
      default:
        return 0;
    }
  }
} 