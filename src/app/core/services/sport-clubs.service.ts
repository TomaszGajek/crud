import { Injectable } from '@angular/core';
import { SportClub } from '../models/sport-club.interface';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SportClubsService {
  url = '/clubs';
  sportClubs$: Observable<SportClub[]> = this.http
    .get<SportClub[]>(this.url)
    .pipe(
      tap((data) => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );

  constructor(private http: HttpClient) {}

  deleteClub(id: number): Observable<null> {
    return this.http
      .delete<null>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(err: any) {
    let errorMessage: string;

    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);

    return throwError(errorMessage);
  }
}
