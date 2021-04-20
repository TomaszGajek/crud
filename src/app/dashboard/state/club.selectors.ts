import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClubState } from './club.reducer';

const getClubFeatureState = createFeatureSelector<ClubState>('clubs');

export const getClubs = createSelector(
  getClubFeatureState,
  (state) => state.clubs
);

export const getError = createSelector(
  getClubFeatureState,
  (state) => state.error
);

export const getClubById = createSelector(
  getClubFeatureState,
  (state: ClubState, { id }) => state.clubs.find((club) => club.id === id)
);
