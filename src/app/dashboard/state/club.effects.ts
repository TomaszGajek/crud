import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SportClubsService } from '../../core/services/sport-clubs.service';
import * as ClubActions from './club.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SportClub } from '../../core/models/sport-club.interface';

@Injectable()
export class ClubEffects {
  constructor(
    private actions$: Actions,
    private clubsService: SportClubsService
  ) {}

  loadClubs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClubActions.loadClubs),
      mergeMap(() =>
        this.clubsService.sportClubs$.pipe(
          map((clubs: SportClub[]) =>
            ClubActions.loadClubsSuccessful({ clubs })
          )
        )
      ),
      catchError((error: string) => of(ClubActions.loadClubsFailure({ error })))
    );
  });
}
