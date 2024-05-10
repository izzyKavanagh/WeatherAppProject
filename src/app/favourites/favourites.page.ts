import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons,
IonCard, IonCardContent, IonCardHeader, IonLabel, IonCardTitle, IonCardSubtitle,
IonButton } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
  IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonLabel, 
  IonCardTitle, IonCardSubtitle, RouterLinkWithHref, IonButton]
})
export class FavouritesPage implements OnInit {
  weatherInfo:any [] = [];
  cityName:any;

  constructor() { }
 
  ngOnInit() {
    const weatherFavouritesString = localStorage.getItem('weatherFavourites'); //get favourites weather data from local storage
  if (weatherFavouritesString !== null) {
    try {
      this.weatherInfo = JSON.parse(weatherFavouritesString); //convert
      console.log('Weather favourites:', this.weatherInfo); 
    } catch (error) {
      console.error('Error parsing weather favourites data:', error);
    }
  }
  }

  //convert to celsius
  kelvinToCelsius(temp: number): string {
    const celsius = temp - 273.15;
    return celsius.toFixed(1);
  }

  //clear local storage weather data for favourites 
  clearLocalStorage() {
    localStorage.removeItem('weatherFavourites');
    this.weatherInfo = []; 
  }

}
