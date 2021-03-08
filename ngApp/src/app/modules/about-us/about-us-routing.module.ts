import { SourcesComponent } from './pages/sources/sources.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent
  },
  {
    path: 'sources',
    component: SourcesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
