import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BuildingComponent } from './apps/gorilla/objects/building/building.component';
import { BananaComponent } from './apps/gorilla/objects/banana/banana.component';
import { GorillaComponent } from './apps/gorilla/objects/gorilla/gorilla.component';
import { SunComponent } from './apps/gorilla/objects/sun/sun.component';
import { WindComponent } from './apps/gorilla/objects/wind/wind.component';
import { ShapeComponent } from './apps/gorilla/objects/shape/shape.component';
import { GorillaAppComponent } from './apps/gorilla/gorilla.component';

const appRoutes: Routes = [
    
  { path: 'apps/gorilla', component: GorillaAppComponent },
  {
    path      : '**',
    component:  AppComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    BuildingComponent,
    BananaComponent,
    GorillaComponent,
    SunComponent,
    WindComponent,
    ShapeComponent,
    GorillaAppComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    FormsModule,
    RouterModule.forRoot(appRoutes,  { enableTracing: true }),
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
