import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_KEY = '4f359bb66b5d6fa191ba2176fc5b11a4';

@Injectable({
  providedIn: 'root'
})
export class WeatherInfoService {

  constructor(private httpClient: HttpClient) { }

  getWeather(lat: number, lon: number): Observable<any> {
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = 'YOUR_API_KEY'; // Replace with your API key

    return this.httpClient.get<any>(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  }
}
