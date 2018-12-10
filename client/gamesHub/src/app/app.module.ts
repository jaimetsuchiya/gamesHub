import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef, Injectable } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { AppsComponent } from './apps/apps.component';
import { CheckersComponent } from './apps/checkers/checkers.component';
import { GorillaAppComponent } from './apps/gorilla/gorilla.component';
import { GorillaModule } from './apps/gorilla/gorilla.module';
import { CheckersModule } from './apps/checkers/checkers.module';

const appRoutes: Routes = [
    
  { path: 'apps/checkers', component: CheckersComponent },
  { path: 'apps/gorilla', component: GorillaAppComponent },
  { path: 'apps', component: AppsComponent },
  { path: '', component:  AppComponent  },
];

@NgModule({
  imports: [
    BrowserModule,
    UiModule,
    FormsModule,
    GorillaModule,
    CheckersModule,
    RouterModule.forRoot(appRoutes,  { enableTracing: true }),
  ],
  exports: [RouterModule],
  declarations: [
    AppComponent,
    AppsComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
