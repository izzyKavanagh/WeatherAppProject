import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonItem, IonInput,
IonLabel, IonButton, IonBackButton, IonButtons} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
  IonItem, IonInput,IonLabel, IonButton, IonBackButton, IonButtons ]
})
export class SearchPage implements OnInit {
  cityName:any;
  constructor(private router:Router) { }

  //method that get city name and passes it to the weather page
  searchCity() {
    if (this.cityName.trim() === '') {
      console.log('Please enter a city name.');
      return;
    }
    const formattedCityName = this.capitalizeFirstLetter(this.cityName); //call method
    this.router.navigate(['/weather', formattedCityName]); //open weather page
  }

  //method that makes the city name search case insensitive when searching the API
  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1); //converts first letter to uppercase
  }

  ngOnInit() {
  }

}
