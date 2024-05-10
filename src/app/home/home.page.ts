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

//get api key/url from environment file
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
    //get the current city name from local storage
    const cityNameString = localStorage.getItem('currentCityName');
    if(cityNameString !== null){//if the local storage is not empty
      this.cityName = JSON.parse(cityNameString); //convert from string back to object
    }
    else{
      this.cityName = null; 
    }

    //get current location weather from local storage 
    const weatherInfoString = localStorage.getItem('weatherCurrentLocation');
    if (weatherInfoString !== null) { //if the local was not empty
      this.weatherInfo = JSON.parse(weatherInfoString); //convert from string back to object
    } else {
        this.weatherInfo = null;
      }
  }

  //method that gets current time
  async getTime()
  {
    this.coordinates = await Geolocation.getCurrentPosition(); //get user's current coordinates using plug-in
    const timestamp = new Date(this.coordinates.timestamp); //store timestamp based on user's location
    //convert timestamp
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    this.time = `${hours}:${minutes}`; //returns current time (hours:minutes)
  }

  //method that converst from kelvin to celsius 
  kelvinToCelsius(temp: number): string {
    const celsius = temp - 273.15;
    return celsius.toFixed(1); //returns with 1 decimal place
  }
}