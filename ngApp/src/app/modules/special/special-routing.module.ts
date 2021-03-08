import { SpecialDetailsComponent } from './pages/special-details/special-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecialComponent } from './pages/special-main/special.component';
import { ArrangementsComponent } from './pages/arrangements/arrangements.component';
import { ArrangementsDetailsComponent } from './pages/arrangements-details/arrangements-details.component';

const routes: Routes = [

  {
    path: '',
    component: SpecialComponent,
   // canActivate: [AuthGuard]
  },
  {
    path: 'arrangements',
    component: ArrangementsComponent,
  },
  {
    path: 'arrangements/:category',
    component: ArrangementsDetailsComponent,
  },
  {
    path: ':category',
    component: SpecialDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialRoutingModule { }
