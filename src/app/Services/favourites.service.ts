import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private favouritesSubject = new BehaviorSubject<any[]>([]);
  favourites$ = this.favouritesSubject.asObservable();

  constructor() {}

  addToFavourites(weatherInfo: any) {
    const favourites = this.favouritesSubject.value;
    favourites.push(weatherInfo);
    this.favouritesSubject.next(favourites);
  }
}
