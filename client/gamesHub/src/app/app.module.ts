import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BuildingComponent } from './apps/gorilla/objects/building/building.component';
import { BananaComponent } from './apps/gorilla/objects/banana/banana.component';
import { GorillaComponent } from './apps/gorilla/objects/gorilla/gorilla.component';
import { SunComponent } from './apps/gorilla/objects/sun/sun.component';
import { WindComponent } from './apps/gorilla/objects/wind/wind.component';
import { ShapeComponent } from './apps/gorilla/objects/shape/shape.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildingComponent,
    BananaComponent,
    GorillaComponent,
    SunComponent,
    WindComponent,
    ShapeComponent
  ],
  imports: [
    BrowserModule,
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
