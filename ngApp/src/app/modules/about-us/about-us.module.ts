import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { SourcesComponent } from './pages/sources/sources.component';


@NgModule({
  declarations: [AboutUsComponent, SourcesComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
