import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubsComponent } from './containers/clubs/clubs.component';
import { ClubContentComponent } from './components/club-content/club-content.component';
import { ClubListComponent } from './components/club-list/club-list.component';

const routes: Routes = [
  {
    path: '',
    component: ClubsComponent,
    children: [
      { path: ':id', component: ClubContentComponent },
      { path: '', component: ClubListComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
