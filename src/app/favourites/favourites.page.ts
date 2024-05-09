import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonLabel, IonCardTitle, IonCardSubtitle
 } from '@ionic/angular/standalone';
import { FavouritesService } from '../Services/favourites.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
  IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonLabel, 
  IonCardTitle, IonCardSubtitle]
})
export class FavouritesPage implements OnInit {
  weatherInfo:any;

  constructor(private favouritesService:FavouritesService) { }

  ngOnInit() {
    const weatherInfoString = localStorage.getItem('weatherFavourites');
    if (weatherInfoString !== null) {
      this.weatherInfo = JSON.parse(weatherInfoString);
    } else {
    // Handle the case where 'weatherInfo' is null (not found in local storage)
    }
  }

}
