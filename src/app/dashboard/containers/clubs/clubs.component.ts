import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClubSelectors, ClubActions, State } from '../../state';
import { Observable, Subject } from 'rxjs';
import { SportClub } from '@core/models/sport-club.interface';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '@app/dashboard/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { map, takeUntil, tap } from 'rxjs/operators';
import { DrawerService } from '@app/dashboard/services/drawer.service';
import { SMALL_WIDTH_BREAKPOINT } from '@core/models/breakpoints.constants';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss'],
  animations: [slideInAnimation]
})
export class ClubsComponent implements OnInit, AfterViewChecked, OnDestroy {
  errorMessage$: Observable<string>;
  clubs$: Observable<SportClub[]>;
  isScreenSmall$: Observable<boolean> = this.breakpointObserver
    .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
    .pipe(
      tap((state) => (this.smallDevice = state.matches)),
      map((state: BreakpointState) => state.matches)
    );

  @ViewChild(MatDrawer) drawer: MatDrawer;

  private subGuard$: Subject<void> = new Subject<void>();
  private smallDevice;

  constructor(
    private store: Store<State>,
    private breakpointObserver: BreakpointObserver,
    private changeRef: ChangeDetectorRef,
    private drawerService: DrawerService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ClubActions.loadClubs());
    this.clubs$ = this.store.select(ClubSelectors.getClubs);
    this.errorMessage$ = this.store.select(ClubSelectors.getError);

    this.drawerService
      .getDrawerState()
      .pipe(takeUntil(this.subGuard$))
      .subscribe((status: boolean) => void (status ? this.drawer.close() : this.drawer.open()));
  }

  ngAfterViewChecked(): void {
    this.changeRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.unsubscribe();
  }

  prepareRoute(outlet: RouterOutlet): RouterOutlet {
    if (this.smallDevice) {
      return outlet;
    }
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
