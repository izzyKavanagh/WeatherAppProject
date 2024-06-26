import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButton, 
IonCard, IonCardContent, IonCardTitle, IonBackButton, IonButtons,
IonItem, IonInput, IonLabel, IonCardSubtitle } from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RouterLinkWithHref } from '@angular/router';

const API_KEY = environment.API_KEY;
const API_URL2 = environment.API_URL2;

@Component({
  selector: 'app-current-location',
  templateUrl: './current-location.page.html',
  styleUrls: ['./current-location.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton,
    IonCard, IonCardContent, IonCardTitle, IonBackButton, IonButtons, HttpClientModule,IonItem,
    IonInput, IonLabel, IonCardSubtitle, RouterLinkWithHref]
})
export class CurrentLocationPage implements OnInit {

  coordinates:any = "";
  lat:number = 0;
  lon:number = 0;
  time:any = 0;
  date:any;
  cityName:any;
  weatherInfo:any;

  constructor(private httpClient:HttpClient, private router:Router) {}

  ngOnInit() {
    const cityNameString = localStorage.getItem('currentCityName'); //get current city name from local storage
    if(cityNameString !== null){
      this.cityName = JSON.parse(cityNameString); //convert from string
    }
    else{
      this.cityName = null;
    }

    this.getGPS();

    //get current location weatherInfo from local storage
    const weatherInfoString = localStorage.getItem('weatherCurrentLocation');
    if (weatherInfoString !== null) {
      this.weatherInfo = JSON.parse(weatherInfoString); //convert from string
    } else {
        this.weatherInfo = null;
      }
  }

  //Method that get coordinates and date/time using plugin geolocation
  async getGPS(){
    this.coordinates = await Geolocation.getCurrentPosition(); //get coordinates 
    const timestamp = new Date(this.coordinates.timestamp); //store timestamp

    // Extract time of day (hours and minutes)
    const hours = timestamp.getHours().toString().padStart(2, '0');
    const minutes = timestamp.getMinutes().toString().padStart(2, '0');
    this.time = `${hours}:${minutes}`;

    // Extract date (year, month, and day)
    const year = timestamp.getFullYear();
    const month = (timestamp.getMonth() + 1).toString().padStart(2, '0'); 
    const day = timestamp.getDate().toString().padStart(2, '0');
    this.date = `${year}-${month}-${day}`;

    //store coordinates 
    this.lon = this.coordinates.coords.longitude;
    this.lat = this.coordinates.coords.latitude;
  }

  //get current city name from coordinates
  getLocation()
  {
    //call to reverse geocoding api 
    this.httpClient.get<any[]>(`${API_URL2}reverse?lat=${this.lat}&lon=${this.lon}&appid=${API_KEY}`).subscribe(
      (result) => {
        this.cityName = result;
        console.log(result);
      });
  }
  
  //convert kelvin to celsius
  kelvinToCelsius(temp: number): string {
    const celsius = temp - 273.15;
    return celsius.toFixed(1);
  }

  //method that clears local storage for current location weather data
  clearLocalStorage() {
    localStorage.removeItem('weatherCurrentLocation');
    this.weatherInfo = null;
  }

}
