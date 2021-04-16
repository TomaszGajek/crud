import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportclubsComponent } from './containers/sportclubs/sportclubs.component';

const routes: Routes = [
  { path: '', component: SportclubsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
