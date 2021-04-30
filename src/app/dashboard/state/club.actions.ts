import { createAction, props } from '@ngrx/store';
import { SportClub } from '@core/models/sport-club.interface';
import { createHTTPActions, ResponseError } from '@core/helpers/createHTTPActions.helper';

export const [loadData, loadDataSuccess, loadDataError] = createHTTPActions<
  null,
  { clubs: SportClub[] },
  ResponseError
>('[Sport Clubs] Load Data');

// export const loadClubs = createAction('[Sport Clubs] Load');
//
// export const loadClubsSuccessful = createAction('[Sport Clubs] Load Successful', props<{ clubs: SportClub[] }>());
//
// export const loadClubsFailure = createAction('[Sport Clubs] Load Failure', props<{ error: string }>());

export const addClub = createAction('[Sport Clubs] Add Club', props<{ club: SportClub }>());

export const addClubSuccess = createAction('[Sport Clubs] Add Success', props<{ club: SportClub }>());

export const addClubFailure = createAction('[Sport Clubs] Add Failure', props<{ error: string }>());

export const updateClub = createAction('[Sport Clubs] Update', props<{ club: SportClub }>());

export const updateClubSuccess = createAction('[Sport Clubs] Update Success', props<{ club: SportClub }>());

export const updateClubFailure = createAction('[Sport Clubs] Update Failure', props<{ error: string }>());

export const deleteClub = createAction('[Sport Clubs] Delete', props<{ id: number }>());

export const deleteClubSuccess = createAction('[Sport Clubs] Delete Success', props<{ id: number }>());

export const deleteClubFailure = createAction('[Sport Clubs] Delete Failure', props<{ error: string }>());
