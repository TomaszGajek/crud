import { SportClub } from '@core/models/sport-club.interface';
import { createReducer, on } from '@ngrx/store';
import * as ClubActions from './club.actions';

export interface ClubState {
  clubs: SportClub[];
  error: string;
}

const initialState: ClubState = {
  clubs: null,
  error: ''
};

export const clubReducer = createReducer<ClubState>(
  initialState,
  on(
    ClubActions.loadDataSuccess,
    (state, action): ClubState => {
      console.log(action);
      return {
        ...state,
        clubs: action.payload.clubs,
        error: ''
      };
    }
  ),
  on(
    ClubActions.loadDataError,
    (state, action): ClubState => {
      return {
        ...state,
        clubs: null,
        error: action.payload.error
      };
    }
  ),
  on(
    ClubActions.deleteClubSuccess,
    (state, action): ClubState => {
      const clubs: SportClub[] = state.clubs.filter((club) => club.id !== action.id);

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
  ),
  on(
    ClubActions.addClubFailure,
    (state, action): ClubState => {
      return {
        ...state,
        error: action.error
      };
    }
  ),
  on(
    ClubActions.updateClubSuccess,
    (state, action): ClubState => {
      return {
        ...state,
        clubs: state.clubs.map((club) => (club.id === action.club.id ? action.club : club))
      };
    }
  )
);
