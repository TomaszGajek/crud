import { SportClub } from '../../core/models/sport-club.interface';
import { createReducer, on } from '@ngrx/store';
import * as ClubActions from './club.actions';

export interface ClubState {
  clubs: SportClub[];
  error: string;
}

const initialState: ClubState = {
  clubs: [],
  error: ''
};

export const clubReducer = createReducer<ClubState>(
  initialState,
  on(
    ClubActions.loadClubsSuccessful,
    (state, action): ClubState => {
      return {
        ...state,
        clubs: action.clubs,
        error: ''
      };
    }
  ),
  on(
    ClubActions.loadClubsFailure,
    (state, action): ClubState => {
      return {
        ...state,
        error: action.error
      };
    }
  )
);
