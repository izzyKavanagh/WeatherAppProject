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

//get API key/url from environment page
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
    private alertController: AlertController, private router:Router) {
  }

  ngOnInit() {
    //get the city name that was passed from the search page
    this.route.params.subscribe(params => {
      this.cityName = params['city'];
    });

    this.getCity();
  }

  //method that gets coordinates based on city name
  getCity()
  {
    //call geocoding API
    this.httpClient.get<any[]>(`${API_URL2}direct?q=${this.cityName}&appid=${API_KEY}`).subscribe(
      (data) => {
        if (data && data.length > 0) {
          const location = data.find(location => location.name === this.cityName); 
          if (location) //if the city name provided is found in the API
          {
            //store coordinates 
            this.lat = location.lat;
            this.lon = location.lon;
            console.log('Latitude:', this.lat);
            console.log('Longitude:', this.lon);
            // Call the method to fetch weather data and forecast using this.lat and this.lon
            this.getWeather();
            this.getForecast();
          } else { //displays error alert
            this.presentAlert('Location Not Found', 'The specified city was not found.');
            console.error('Location not found');
          }
        } else { //displays error alert
          this.presentAlert('Location Not Found', 'The specified city was not found.');
          console.error('No location data found');
        }
      },
      (error) => { //displays error alert
        this.presentAlert('Location Not Found', 'The specified city was not found.');
        console.error('Error fetching location data:', error);
      }
    );
  }
  
  //method that retrievs current weather data from API
  getWeather() {
    // Call to current weather API
    this.httpClient.get<any>(`${API_URL}weather?lat=${this.lat}&lon=${this.lon}&appid=${API_KEY}`).subscribe((result) => {
      this.weatherInfo.push(result); //stores API response in weatherInfo
      console.log(result);
    });
  }

  //method that retrievs forecast weather data from API
  getForecast() {
    //call to forecast API
    this.httpClient.get<any>(`${API_URL3}forecast?lat=${this.lat}&lon=${this.lon}&appid=${API_KEY}`).subscribe((result) => {
      this.weatherForecast.push(result); //stores API response in weatherForecast
      console.log(result);
    });
  }

  //converst kelvin to celsius
  kelvinToCelsius(temp: number): string {
    const celsius = temp - 273.15;
    return celsius.toFixed(1);
  }

  //method that saves weatherInfo to storage as current location
  async setCurrentLocation(){
    if (this.weatherInfo.length > 0) { //if weatherInfo is not empty
      const city = this.cityName;
      localStorage.setItem('currentCityName', JSON.stringify(city)); //convert to string
      const weather = this.weatherInfo[0]; // Assuming weatherInfo array contains weather data for one location
      localStorage.setItem('weatherCurrentLocation', JSON.stringify(weather)); //store data in local storage under the ket 'weatherCurrentLocation'
      this.router.navigate(['/current-location']); //load current location page
    } else { //show error message
      this.presentAlert('Weather Not Found', 'No weather information available to save.');
    }
  }

  //method that saves weatherInfo to storage as a favourite location
  async setFavouriteLocation() {
    if (this.weatherInfo.length > 0) { 
      const city = this.cityName;
      let weatherFavourites: any[] = [];
      const storedWeatherFavouritesString = localStorage.getItem('weatherFavourites'); //get previously stored data so as to not overwrite it
      if (storedWeatherFavouritesString) {
        // Check if the retrieved data is an array
        try {
          weatherFavourites = JSON.parse(storedWeatherFavouritesString); //converts from string
          if (!Array.isArray(weatherFavourites)) {
            // If the retrieved data is not an array, create a new array
            weatherFavourites = [];
          }
        } catch (error) {
          console.error('Error parsing weather favourites data:', error);
          weatherFavourites = []; //convert to array
        }
      }
      weatherFavourites.push({
        city: city,
        weather: this.weatherInfo[0] // Assuming weatherInfo array contains weather data for one location
      });
  
      //saves weatherInfo data to storage under key 'weatherFavourites'
      localStorage.setItem('weatherFavourites', JSON.stringify(weatherFavourites));
      this.router.navigate(['/favourites']); //opens favourites page
    } else {
      this.presentAlert('Weather Not Found', 'No weather information available to save.');
    }
  }

  //method that formats date based on timestamp
  formatDate(timestamp: number): string {
    const milliseconds = timestamp * 1000;
    const date = new Date(milliseconds);
    // Format the date as DD/MM/YYYY and return it
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  //method that formats time based on timestamp
  formatTime(timestamp: number): string {
    const milliseconds = timestamp * 1000;
    const date = new Date(milliseconds);
    // Format the time as desired (HH:MM)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`; //returns time as (HH:MM)
  }

  //method that shows pop-up alert when an errir occurs
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({ //creates message based on input
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
    await alert.present(); //display alert
  }
}
