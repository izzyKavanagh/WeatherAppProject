import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, 
IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
IonCardContent, IonBackButton, IonButtons, IonRow, IonCol } from '@ionic/angular/standalone';
import { RouterLinkWithHref, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FavouritesService } from '../Services/favourites.service';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;
const API_URL2 = environment.API_URL2;
const API_URL3 = environment.API_URL3;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule, FormsModule, 
    RouterLinkWithHref, HttpClientModule, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
    IonCardContent, IonBackButton, IonButtons, IonRow, IonCol]
})
export class WeatherPage implements OnInit {

  weatherInfo:any[]= [];
  weatherForecast:any[] = [];
  cityName:string = "";
  lat:number = 0;
  lon:number = 0;

  constructor(public httpClient: HttpClient, private route:ActivatedRoute, 
    private alertController: AlertController, private router:Router, private favouritesService:FavouritesService,
    /*private storage:Storage*/) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.cityName = params['city'];
    });

    this.getCity();
  }

  getCity()
  {
    this.httpClient.get<any[]>(`${API_URL2}direct?q=${this.cityName}&appid=${API_KEY}`).subscribe(
      (data) => {
        if (data && data.length > 0) {
          const location = data.find(location => location.name === this.cityName);
          if (location) {
            this.lat = location.lat;
            this.lon = location.lon;
            console.log('Latitude:', this.lat);
            console.log('Longitude:', this.lon);
            // Call the method to fetch weather data using this.lat and this.lon
            this.getWeather();
            this.getForecast();
          } else {
            this.presentAlert('Location Not Found', 'The specified city was not found.');
            console.error('Location not found');
          }
        } else {
          this.presentAlert('Location Not Found', 'The specified city was not found.');
          console.error('No location data found');
        }
      },
      (error) => {
        this.presentAlert('Location Not Found', 'The specified city was not found.');
        console.error('Error fetching location data:', error);
      }
    );
  }

  getWeather() {
    this.httpClient.get<any>(`${API_URL}weather?lat=${this.lat}&lon=${this.lon}&appid=${API_KEY}`).subscribe((result) => {
      this.weatherInfo.push(result);
      console.log(result);
    });
  }

  getForecast() {
    this.httpClient.get<any>(`${API_URL3}forecast?lat=${this.lat}&lon=${this.lon}&appid=${API_KEY}`).subscribe((result) => {
      this.weatherForecast.push(result);
      console.log(result);
    });
  }

  kelvinToCelsius(temp: number): string {
    const celsius = temp - 273.15;
    return celsius.toFixed(1);
  }

  async setCurrentLocation(){
    if (this.weatherInfo.length > 0) {
      const city = this.cityName;
      localStorage.setItem('currentCityName', JSON.stringify(city));
      const weather = this.weatherInfo[0]; // Assuming weatherInfo array contains weather data for one location
      localStorage.setItem('weatherCurrentLocation', JSON.stringify(weather));
      this.router.navigate(['/current-location']);
    } else {
      this.presentAlert('Weather Not Found', 'No weather information available to save.');
    }
  }

  async setFavouriteLocation() {
    if (this.weatherInfo.length > 0) {
      const city = this.cityName;
      let weatherFavourites: any[] = [];
      const storedWeatherFavouritesString = localStorage.getItem('weatherFavourites');
      
      if (storedWeatherFavouritesString) {
        // Check if the retrieved data is an array
        try {
          weatherFavourites = JSON.parse(storedWeatherFavouritesString);
          if (!Array.isArray(weatherFavourites)) {
            // If the retrieved data is not an array, create a new array
            weatherFavourites = [];
          }
        } catch (error) {
          console.error('Error parsing weather favourites data:', error);
          weatherFavourites = [];
        }
      }
  
      weatherFavourites.push({
        city: city,
        weather: this.weatherInfo[0] // Assuming weatherInfo array contains weather data for one location
      });
  
      localStorage.setItem('weatherFavourites', JSON.stringify(weatherFavourites));
      this.router.navigate(['/favourites']);
    } else {
      this.presentAlert('Weather Not Found', 'No weather information available to save.');
    }
  }

  formatDate(timestamp: number): string {
    const milliseconds = timestamp * 1000;
    const date = new Date(milliseconds);
    // Format the date as MM/DD/YYYY and return it
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  formatTime(timestamp: number): string {
    const milliseconds = timestamp * 1000;
    const date = new Date(milliseconds);
    // Format the time as desired (e.g., HH:MM:SS)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirect to the search page
            this.router.navigate(['/search']);
          }
        }
      ]
    });
    await alert.present();
  }
}
