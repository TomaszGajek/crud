import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SportclubsComponent } from './containers/sportclubs/sportclubs.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { clubReducer } from './state/club.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ClubEffects } from './state/club.effects';

@NgModule({
  declarations: [SportclubsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('clubs', clubReducer),
    EffectsModule.forFeature([ClubEffects])
  ]
})
export class DashboardModule {}
