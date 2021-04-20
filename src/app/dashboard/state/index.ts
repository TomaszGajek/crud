import { ClubState } from './club.reducer';
import * as ClubSelectors from './club.selectors';
import * as ClubActions from './club.actions';

export interface State {
  clubs: ClubState;
}

export { ClubSelectors, ClubActions };
