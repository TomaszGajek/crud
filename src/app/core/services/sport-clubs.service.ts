import { Injectable } from '@angular/core';
import { SportClub } from '../models/sport-club.interface';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

const clubsMock: SportClub[] = [
  { name: 'Stomil Grudziądz' },
  { name: 'Czarni Słupsk' },
  { name: 'Lechia Gdańsk' },
  { name: 'Arka Gdynia' }
];

@Injectable({
  providedIn: 'root'
})
export class SportClubsService {
  sportClubs$: Observable<SportClub[]> = of(clubsMock);
}
