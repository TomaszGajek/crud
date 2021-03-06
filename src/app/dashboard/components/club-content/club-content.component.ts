import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ClubSelectors } from '../../state';
import { ClubActions } from '../../state';
import { MatDialog } from '@angular/material/dialog';
import { WarningModalComponent } from '@shared/components/warning-modal/warning-modal.component';
import { ModalEnum } from '@core/models/modal.enum';
import { SportClub } from '@core/models/sport-club.interface';
import { ClubModalFormComponent } from '../club-modal-form/club-modal-form.component';
import { MapService } from '@app/dashboard/services/map.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-club-content',
  templateUrl: './club-content.component.html',
  styleUrls: ['./club-content.component.scss']
})
export class ClubContentComponent implements OnDestroy {
  selectedClub$ = this.activatedRoute.params.pipe(
    switchMap((props) =>
      this.store.select(ClubSelectors.getClubById, { id: +props.id })
    )
  );

  private subGuard$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private dialog: MatDialog,
    private mapService: MapService
  ) {}

  ngOnDestroy(): void {
    this.subGuard$.next();
    this.subGuard$.unsubscribe();
  }

  openFormDialog(club: SportClub): void {
    this.dialog.open(ClubModalFormComponent, {
      width: '500px',
      data: club
    });
  }

  openWarningDialog(id: number): void {
    const dialogRef = this.dialog.open(WarningModalComponent, {
      panelClass: 'custom-dialog-container'
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: ModalEnum) => {
          return result === ModalEnum.CONFIRM;
        }),
        takeUntil(this.subGuard$)
      )
      .subscribe(() => this.deleteItem(id));
  }

  deleteItem(id: number): void {
    this.store.dispatch(ClubActions.deleteClub({ id }));
    void this.router.navigate(['/']);
  }

  return(): void {
    void this.router.navigate(['/']);
    this.mapService.zoomOut();
  }
}
