import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';

@NgModule({
  declarations: [WarningModalComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule]
})
export class SharedModule {}
