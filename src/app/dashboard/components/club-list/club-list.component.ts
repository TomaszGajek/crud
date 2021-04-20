import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClubSelectors, State } from '../../state';
import { Observable } from 'rxjs';
import { SportClub } from '../../../core/models/sport-club.interface';
import { Localization } from '../../../core/models/localization.interface';
import { MapService } from '../../../core/services/map.service';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent {
  title = 'Sport Clubs';
  clubs$: Observable<SportClub[]> = this.store.select(ClubSelectors.getClubs);

  constructor(private store: Store<State>, private mapService: MapService) {}

  handleSelectedClub(event: Localization): void {
    this.mapService.flyToSelectedPoint(event);
  }

  openContactDialog(): void {
    console.log('open');
  }
}
