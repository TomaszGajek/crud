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
        clubs: null,
        error: action.error
      };
    }
  ),
  on(
    ClubActions.deleteClubSuccess,
    (state, action): ClubState => {
      const clubs: SportClub[] = state.clubs.filter(
        (club) => club.id !== action.id
      );

      return {
        ...state,
        clubs
      };
    }
  ),
  on(
    ClubActions.deleteClubFailure,
    (state, action): ClubState => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(
    ClubActions.addClubSuccess,
    (state, action): ClubState => {
      const clubs: SportClub[] = [...state.clubs, action.club];

      return {
        ...state,
        clubs
      };
    }
  )
);
