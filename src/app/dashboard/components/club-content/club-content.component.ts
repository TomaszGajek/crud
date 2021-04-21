import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ClubSelectors } from '../../state';
import { ClubActions } from '../../state';
import { MatDialog } from '@angular/material/dialog';
import { WarningModalComponent } from '@shared/components/warning-modal/warning-modal.component';
import { ModalEnum } from '@core/models/modal.enum';
import { SportClub } from '@core/models/sport-club.interface';
import { ClubModalFormComponent } from '../club-modal-form/club-modal-form.component';

@Component({
  selector: 'app-club-content',
  templateUrl: './club-content.component.html',
  styleUrls: ['./club-content.component.scss']
})
export class ClubContentComponent {
  selectedClub$ = this.activatedRoute.params.pipe(
    switchMap((props) =>
      this.store.select(ClubSelectors.getClubById, { id: +props.id })
    )
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private dialog: MatDialog
  ) {}

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
        })
      )
      .subscribe(() => this.deleteItem(id));
  }

  deleteItem(id: number): void {
    this.store.dispatch(ClubActions.deleteClub({ id }));
    void this.router.navigate(['/']);
  }
}
