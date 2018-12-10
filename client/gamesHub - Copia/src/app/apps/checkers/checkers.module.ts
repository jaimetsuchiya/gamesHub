import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckersService } from './checkers.service';
import { CheckersComponent } from './checkers.component';
import { BoardComponent } from './objects/board/board.component';
import { PawnComponent } from './objects/pawn/pawn.component';
import { KingComponent } from './objects/king/king.component';
import { SpaceComponent } from './objects/space/space.component';
import { ConsoleComponent } from './objects/console/console.component';
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
    CheckersService, 
  ],
  declarations: [
    CheckersComponent,
    BoardComponent,
    PawnComponent,
    KingComponent,
    SpaceComponent,
    ConsoleComponent
  ]
})
export class CheckersModule { }
