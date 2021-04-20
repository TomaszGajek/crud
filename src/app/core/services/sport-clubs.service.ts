import { Injectable } from '@angular/core';
import { SportClub } from '../models/sport-club.interface';
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

  private handleError(err: HttpErrorResponse) {
    const errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    console.log(errorMessage);

    return throwError(errorMessage);
  }
}
