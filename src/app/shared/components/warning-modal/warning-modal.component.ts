import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalEnum } from '@core/models/modal.enum';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WarningModalComponent {
  constructor(private dialogRef: MatDialogRef<WarningModalComponent>) {}

  delete(): void {
    this.dialogRef.close(ModalEnum.CONFIRM);
  }

  dismiss(): void {
    this.dialogRef.close(ModalEnum.CANCEL);
  }
}
