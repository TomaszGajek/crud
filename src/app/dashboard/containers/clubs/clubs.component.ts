import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ClubSelectors, ClubActions, State } from '../../state';
import { Observable } from 'rxjs';
import { SportClub } from '@core/models/sport-club.interface';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '@app/dashboard/animations';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss'],
  animations: [slideInAnimation]
})
export class ClubsComponent implements OnInit, AfterViewChecked {
  errorMessage$: Observable<string>;
  clubs$: Observable<SportClub[]>;

  constructor(
    private store: Store<State>,
    private changeRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ClubActions.loadClubs());
    this.clubs$ = this.store.select(ClubSelectors.getClubs);
    this.errorMessage$ = this.store.select(ClubSelectors.getError);
  }

  ngAfterViewChecked(): void {
    this.changeRef.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet): RouterOutlet {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
