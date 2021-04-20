import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ClubsComponent } from './containers/clubs/clubs.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { clubReducer } from './state/club.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ClubEffects } from './state/club.effects';
import { MapComponent } from './components/map/map.component';
import { ClubContentComponent } from './components/club-content/club-content.component';
import { ClubListComponent } from './components/club-list/club-list.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ClubModalFormComponent } from './components/club-modal-form/club-modal-form.component';

@NgModule({
  declarations: [
    ClubsComponent,
    MapComponent,
    ClubContentComponent,
    ClubListComponent,
    ToolbarComponent,
    ClubModalFormComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('clubs', clubReducer),
    EffectsModule.forFeature([ClubEffects])
  ]
})
export class DashboardModule {}
