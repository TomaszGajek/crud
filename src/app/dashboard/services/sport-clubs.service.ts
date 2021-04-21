import { Injectable } from '@angular/core';
import { SportClub } from '@core/models/sport-club.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportClubsService {
  url = '/clubs';
  sportClubs$: Observable<SportClub[]> = this.http
    .get<SportClub[]>(this.url)
    .pipe(catchError(this.handleError));

  constructor(private http: HttpClient) {}

  deleteClub(id: number): Observable<null> {
    return this.http
      .delete<null>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addClub(club: SportClub): Observable<SportClub> {
    return this.http
      .post<SportClub>(`${this.url}`, club)
      .pipe(catchError(this.handleError));
  }

  updateClub(club: SportClub): Observable<SportClub> {
    console.log(club);

    return this.http
      .put<SportClub>(`${this.url}/${club.id}`, club)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    const errorMessage = `Backend returned code ${err.status}: ${err.message}`;

    return throwError(errorMessage);
  }
}
