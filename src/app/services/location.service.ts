import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Location } from '../models/location.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private storageKey = 'weather_app_location';

  constructor(private http: HttpClient) {}

  searchLocation(cityName: string): Observable<Location[]> {
    const url = `${environment.geocodingApiUrl}?city=${encodeURIComponent(cityName)}`;
    const headers = new HttpHeaders({
      'X-Api-Key': environment.geocodingApiKey
    });

    return this.http.get<any[]>(url, { headers }).pipe(
      map(response => {
        return response.map(item => ({
          name: item.name,
          latitude: item.latitude,
          longitude: item.longitude,
          country: item.country,
          state: item.state
        }));
      }),
      catchError(error => {
        console.error('Error fetching location data:', error);
        return throwError(() => new Error('Failed to search location. Please try again.'));
      })
    );
  }

  saveLocation(location: Location): void {
    localStorage.setItem(this.storageKey, JSON.stringify(location));
  }

  getSavedLocation(): Location | null {
    const locationData = localStorage.getItem(this.storageKey);
    return locationData ? JSON.parse(locationData) : null;
  }
}