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
    const weatherFavouritesString = localStorage.getItem('weatherFavourites');
  if (weatherFavouritesString !== null) {
    try {
      this.weatherInfo = JSON.parse(weatherFavouritesString);
      console.log('Weather favourites:', this.weatherInfo); // Log the retrieved data
    } catch (error) {
      console.error('Error parsing weather favourites data:', error);
    }
  }
  }

  kelvinToCelsius(temp: number): string {
    const celsius = temp - 273.15;
    return celsius.toFixed(1);
  }

  clearLocalStorage() {
    localStorage.removeItem('weatherFavourites');
    this.weatherInfo = []; // Clear the local data in the component
  }

}
