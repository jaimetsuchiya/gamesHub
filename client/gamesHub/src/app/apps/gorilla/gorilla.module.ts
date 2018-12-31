import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingComponent } from './objects/building/building.component';
import { BananaComponent } from './objects/banana/banana.component';
import { GorillaComponent } from './objects/gorilla/gorilla.component';
import { SunComponent } from './objects/sun/sun.component';
import { WindComponent } from './objects/wind/wind.component';
import { ShapeComponent } from './objects/shape/shape.component';
import { GorillaAppComponent } from './gorilla.component';
import { GorillaService } from './gorilla.service';
import { BrowserModule } from '@angular/platform-browser';
import { UiModule } from 'src/app/ui/ui.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    UiModule,
    FormsModule,
  ],
  providers: [
    GorillaService
  ],
  declarations: [
    BuildingComponent,
    BananaComponent,
    GorillaComponent,
    SunComponent,
    WindComponent,
    ShapeComponent,
    GorillaAppComponent,
  ]
})
export class GorillaModule { }
