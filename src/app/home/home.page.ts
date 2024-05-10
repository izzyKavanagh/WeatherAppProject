import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
IonCardContent } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({ 
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule, FormsModule, 
  RouterLinkWithHref, HttpClientModule, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent],
})
export class HomePage implements OnInit{
  weatherInfo:any;
  cityName:any;
  time:any = 0.00;
  coordinates:any = "";

  constructor(public httpClient: HttpClient) {
  }

  ngOnInit() {
    this.getTime();
    const cityNameString = localStorage.getItem('currentCityName');
    if(cityNameString !== null){
      this.cityName = JSON.parse(cityNameString);
    }
    else{
      this.cityName = null;
    }

    const weatherInfoString = localStorage.getItem('weatherCurrentLocation');
    if (weatherInfoString !== null) {
      this.weatherInfo = JSON.parse(weatherInfoString);
    } else {
        this.weatherInfo = null;
      }
  }

  async getTime()
  {
    this.coordinates = await Geolocation.getCurrentPosition();
    const timestamp = new Date(this.coordinates.timestamp);
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    this.time = `${hours}:${minutes}`;
  }
  kelvinToCelsius(temp: number): string {
    const celsius = temp - 273.15;
    return celsius.toFixed(1);
  }
}