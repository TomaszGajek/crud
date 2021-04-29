import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageComponent } from '@shared/components/image/image.component';

@NgModule({
  declarations: [WarningModalComponent, ImageComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [MaterialModule, ReactiveFormsModule, ImageComponent]
})
export class SharedModule {}
