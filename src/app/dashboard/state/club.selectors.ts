import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClubState } from './club.reducer';
import { Features } from '@core/models/features.enum';

const getClubFeatureState = createFeatureSelector<ClubState>(Features.Clubs);

export const getClubs = createSelector(getClubFeatureState, (state) => state.clubs);

export const getError = createSelector(getClubFeatureState, (state) => state.error);

export const getClubById = createSelector(getClubFeatureState, (state: ClubState, { id }) =>
  state.clubs.find((club) => club.id === id)
);
