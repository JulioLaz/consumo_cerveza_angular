import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  clave_api = 'c796a4ed594d8361bc09614d8ef0ca65'
  apiUrl: string = '';
  constructor(private http: HttpClient) {

    this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${this.clave_api}&units=metric&lang=es&q=`;

  }

  obtenerDatosClimaticos(pais: string, provincia: string): Observable<any> {
    const url = `${this.apiUrl}${provincia},${pais}`;
    return this.http.get(url);
  }
}
