import {
  Component,
  AfterContentInit,
  OnDestroy,
  ViewChild,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ClubSelectors, State } from '../../state';
import { Observable, Subject } from 'rxjs';
import { MapService } from '../../services/map.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { filter, takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalEnum } from '@core/models/modal.enum';
import { MatDialog } from '@angular/material/dialog';
import { ClubModalFormComponent } from '../club-modal-form/club-modal-form.component';
import { SportClub } from '@core/models/sport-club.interface';
import { DrawerService } from '@app/dashboard/services/drawer.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SMALL_WIDTH_BREAKPOINT } from '@core/models/breakpoints.constants';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnInit, OnDestroy, AfterContentInit {
  title = 'Sport Clubs';
  clubs$: Observable<SportClub[]> = this.store.select(ClubSelectors.getClubs);
  displayedColumns: string[] = ['id', 'name', 'category'];
  dataSource: MatTableDataSource<SportClub>;
  selection = new SelectionModel<SportClub>(false, []);

  @ViewChild(MatSort) sort: MatSort;

  private subGuard$: Subject<void> = new Subject<void>();
  private smallDevice;

  constructor(
    private store: Store<State>,
    private mapService: MapService,
    private dialog: MatDialog,
    private drawerService: DrawerService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .pipe(takeUntil(this.subGuard$))
      .subscribe((state) => (this.smallDevice = state.matches));
  }

  ngAfterContentInit(): void {
    this.clubs$
      .pipe(
        filter((clubs) => clubs?.length > 0),
        takeUntil(this.subGuard$)
      )
      .subscribe((clubs) => {
        this.dataSource = new MatTableDataSource<SportClub>(clubs);
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.unsubscribe();
  }

  handleSelectedClub(club: SportClub): void {
    this.mapService.flyToSelectedPoint({
      lng: club.localization.center[0],
      lat: club.localization.center[1]
    });

    if (this.smallDevice) {
      this.closeDrawer();
    }
  }

  addClub(): void {
    const dialogRef = this.dialog.open(ClubModalFormComponent, {
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().pipe(
      filter((result: ModalEnum) => {
        return result === ModalEnum.CONFIRM;
      })
    );
  }

  closeDrawer(): void {
    this.drawerService.setDrawerClosed(true);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
