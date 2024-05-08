import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
  IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
IonCardContent } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WeatherInfoService } from '../Services/weather-info.service';

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
export class HomePage {
  weatherInfo:any[]= [];

  constructor(public httpClient: HttpClient) {

  }
}