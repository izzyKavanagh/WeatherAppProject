import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem } from '@ionic/angular/standalone';
import { RouterLinkWithHref } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

interface WeatherResponse {
  main: {
    // Define the properties you expect under 'main'
    temp: number; // Assuming 'temp' is a property of the 'main' object and it's a number
    // You can include other properties as needed
  };
  // Define other properties if they exist in the response
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule, FormsModule, RouterLinkWithHref, HttpClientModule, IonItem],
})
export class HomePage {
  temp :number = 0;

  constructor(public httpClient: HttpClient) {
    this.loadData();
  }

  loadData() {
    this.httpClient.get<WeatherResponse>(`${API_URL}/weather?lat=${51.50853000}&lon=${-0.12574000}&appid=${API_KEY}`).subscribe((results : WeatherResponse) => {
      console.log(results);
      this.temp = results.main.temp;
      console.log(this.temp);
    });
  }
}