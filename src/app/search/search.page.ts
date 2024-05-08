import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonItem, IonInput,IonLabel, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
  IonItem, IonInput,IonLabel, IonButton
  ]
})
export class SearchPage implements OnInit {
  cityName:any;
  constructor(private router:Router) { }

  searchCity() {
    if (this.cityName.trim() === '') {
      console.log('Please enter a city name.');
      return;
    }

    const formattedCityName = this.capitalizeFirstLetter(this.cityName);

    this.router.navigate(['/weather', formattedCityName]);
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  ngOnInit() {
  }

}
