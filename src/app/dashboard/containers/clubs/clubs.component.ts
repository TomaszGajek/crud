import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClubSelectors, ClubActions, State } from '../../state';
import { Observable } from 'rxjs';
import { SportClub } from '../../../core/models/sport-club.interface';
import { MapService } from '../../../core/services/map.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit {
  errorMessage$: Observable<string>;
  clubs$: Observable<SportClub[]>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(ClubActions.loadClubs());
    this.clubs$ = this.store.select(ClubSelectors.getClubs);
    this.errorMessage$ = this.store.select(ClubSelectors.getError);
  }
}
