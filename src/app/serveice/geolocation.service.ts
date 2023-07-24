import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  private apiUrl = `https://ipinfo.io?token=66ca927a53e79c`;

  constructor(private http: HttpClient) {}

  getGeolocation(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
