import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JogoDaVelhaService } from './jogodavelha.service';
import { JogoDaVelhaComponent} from './jogodavelha.component';
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
    JogoDaVelhaService
  ],
  declarations: [
    JogoDaVelhaComponent,
  ]
})
export class JogoDaVelhaModule { }
