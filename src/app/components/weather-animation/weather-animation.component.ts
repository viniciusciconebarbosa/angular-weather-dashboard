import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-weather-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-animation.component.html',
  styleUrls: ['./weather-animation.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', [
        animate('1s ease-in-out')
      ])
    ])
  ]
})
export class WeatherAnimationComponent implements OnChanges, AfterViewInit, OnInit {
  @Input() weatherClass: string = '';
  
  particlesArray: number[] = [];
  sunRaysArray: number[] = [];
  
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit() {
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
      
      const opacity = 0.5 + Math.random() * 0.3;
      htmlElement.querySelectorAll('.cloud-part').forEach((part: Element) => {
        (part as HTMLElement).style.opacity = opacity.toString();
      });
      
      const scale = 1.0 + Math.random() * 0.5;
      htmlElement.style.transform = `scale(${scale})`;
      
      const verticalSpacing = 25;
      htmlElement.style.top = `${10 + (index * verticalSpacing) + (Math.random() * 10 - 5)}%`;
      
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