import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialComponent } from './pages/special-main/special.component';
import { SpecialRoutingModule } from './special-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialDetailsComponent } from './pages/special-details/special-details.component';
import { ArrangementsComponent } from './pages/arrangements/arrangements.component';
import { ArrangementsDetailsComponent } from './pages/arrangements-details/arrangements-details.component';


@NgModule({
  declarations: [
    SpecialComponent,
    SpecialDetailsComponent,
    ArrangementsComponent,
    ArrangementsDetailsComponent
  ],
  imports: [
    CommonModule,
    SpecialRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SpecialModule { }
