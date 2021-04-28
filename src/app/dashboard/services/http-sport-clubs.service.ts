import { Injectable } from '@angular/core';
import { SportClub } from '@core/models/sport-club.interface';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SportClubsService } from '@app/dashboard/services/sport-clubs.service';

@Injectable()
export class HttpSportClubsService implements SportClubsService {
  url = '/clubs';

  constructor(private http: HttpClient) {}

  getClubs(): Observable<SportClub[]> {
    return this.http.get<SportClub[]>(this.url).pipe(delay(1000), catchError(this.handleError));
  }

  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(catchError(this.handleError));
  }

  addClub(club: SportClub): Observable<SportClub> {
    return this.http.post<SportClub>(`${this.url}`, club).pipe(catchError(this.handleError));
  }

  updateClub(club: SportClub): Observable<SportClub> {
    console.log(club);

    return this.http.put<SportClub>(`${this.url}/${club.id}`, club).pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    const errorMessage = `Backend returned code ${err.status}: ${err.message}`;

    return throwError(errorMessage);
  }
}
