import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SportClubsService } from '../../core/services/sport-clubs.service';
import * as ClubActions from './club.actions';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SportClub } from '../../core/models/sport-club.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ClubEffects {
  private snackBarDuration = 2500;

  constructor(
    private actions$: Actions,
    private clubsService: SportClubsService,
    private snackBarService: MatSnackBar
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

  addClub$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClubActions.addClub),
      concatMap((action) => {
        return this.clubsService.addClub(action.club).pipe(
          map((club) => {
            this.snackBarService.open('Success', 'You added the club', {
              duration: this.snackBarDuration
            });

            return ClubActions.addClubSuccess({ club });
          }),
          catchError((error) => {
            this.snackBarService.open('Error', 'Failed to delete item', {
              duration: this.snackBarDuration
            });

            return of(ClubActions.addClubFailure({ error }));
          })
        );
      })
    );
  });

  deleteClubs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClubActions.deleteClub),
      mergeMap((action) =>
        this.clubsService.deleteClub(action.id).pipe(
          map(() => {
            this.snackBarService.open('Success', 'Your item has been deleted', {
              duration: this.snackBarDuration
            });

            return ClubActions.deleteClubSuccess({ id: action.id });
          }),
          catchError((error) => {
            this.snackBarService.open('Error', 'Failed to delete item', {
              duration: this.snackBarDuration
            });

            return of(ClubActions.deleteClubFailure({ error }));
          })
        )
      )
    );
  });
}
