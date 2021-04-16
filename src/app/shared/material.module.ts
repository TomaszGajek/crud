import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MODULES: never[] = [MatSidenavModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, MODULES],
  exports: [MODULES]
})
export class MaterialModule {}
