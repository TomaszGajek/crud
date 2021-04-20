import { Injectable } from '@angular/core';
import { SportClub } from '../models/sport-club.interface';
import { EMPTY, Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const clubsMock: SportClub[] = [
  {
    id: 1,
    name: 'Stomil Grudziądz',
    lng: 18.77389645624233,
    lat: 53.48564265854221,
    description:
      'Klub piłkarski założony w 1925 roku. Sekcje dla różnych grup wiekowych'
  },
  {
    id: 2,
    name: 'Czarni Słupsk',
    lng: 17.024825386957286,
    lat: 54.462648351482144,
    description: 'Klub koszykarski. Sekcje dla amatorów, różne grupy wiekowe'
  },
  {
    id: 3,
    name: 'Lechia Gdańsk',
    lng: 18.625222556266642,
    lat: 54.367820237986386,
    description: 'Klub piłkarski założony w 1945 roku.'
  },
  {
    id: 4,
    name: 'Arka Gdynia',
    lng: 18.53119315627023,
    lat: 54.49738042443427,
    description: 'Klub piłkarski grający w 1 lidze, założony w 1929 roku.'
  }
];

@Injectable({
  providedIn: 'root'
})
export class SportClubsService {
  sportClubs$: Observable<SportClub[]> = of(clubsMock);

  selectedClub(id: number): Observable<SportClub> {
    return this.sportClubs$.pipe(
      map((clubs) => clubs.find((club) => club.id === id))
    );
  }

  deleteClub(id: number): Observable<null> {
    return EMPTY;
  }
}
