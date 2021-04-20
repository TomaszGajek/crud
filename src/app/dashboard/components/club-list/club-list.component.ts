import {
  Component,
  AfterContentInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ClubSelectors, State } from '../../state';
import { Observable, Subject } from 'rxjs';
import { SportClub } from '../../../core/models/sport-club.interface';
import { MapService } from '../../../core/services/map.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { filter, takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { WarningModalComponent } from '../../../shared/components/warning-modal/warning-modal.component';
import { ModalEnum } from '../../../core/models/modal.enum';
import { MatDialog } from '@angular/material/dialog';
import { ClubModalFormComponent } from '../club-modal-form/club-modal-form.component';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.scss']
})
export class ClubListComponent implements OnDestroy, AfterContentInit {
  title = 'Sport Clubs';
  clubs$: Observable<SportClub[]> = this.store.select(ClubSelectors.getClubs);
  displayedColumns: string[] = ['id', 'name', 'category'];
  dataSource: MatTableDataSource<SportClub>;
  selection = new SelectionModel<SportClub>(false, []);

  private subGuard$: Subject<void> = new Subject<void>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store<State>,
    private mapService: MapService,
    private dialog: MatDialog
  ) {}

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
    this.mapService.flyToSelectedPoint({ lng: club.lng, lat: club.lat });
  }

  addClub(): void {
    const dialogRef = this.dialog.open(ClubModalFormComponent, {
      width: '500px'
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: ModalEnum) => {
          return result === ModalEnum.CONFIRM;
        })
      )
      .subscribe(() => console.log('dodaje'));
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
