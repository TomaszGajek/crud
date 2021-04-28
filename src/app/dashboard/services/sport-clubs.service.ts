import { Observable } from 'rxjs';
import { SportClub } from '@core/models/sport-club.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { InjectionToken } from '@angular/core';

export interface SportClubsService {
  getClubs(): Observable<SportClub[]>;

  deleteClub(id: number): Observable<void>;

  addClub(club: SportClub): Observable<SportClub>;

  updateClub(club: SportClub): Observable<SportClub>;

  handleError(err: HttpErrorResponse): Observable<never>;
}

export const SPORT_CLUBS = new InjectionToken<SportClubsService>('SportClubsService');
