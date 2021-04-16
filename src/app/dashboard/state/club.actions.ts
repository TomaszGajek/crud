import { createAction, props } from '@ngrx/store';
import { SportClub } from '../../core/models/sport-club.interface';

export const loadClubs = createAction('[Sport Clubs] Load');

export const loadClubsSuccessful = createAction(
  '[Sport Clubs] Load Successful',
  props<{ clubs: SportClub[] }>()
);

export const loadClubsFailure = createAction(
  '[Sport Clubs] Load Failure',
  props<{ error: string }>()
);
