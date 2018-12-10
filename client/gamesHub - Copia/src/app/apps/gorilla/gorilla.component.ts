import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { GorillaService } from './gorilla.service'
import { appComponent } from 'src/app/interfaces/gameComponent';
import { BananaComponent } from './objects/banana/banana.component'
import { BuildingComponent } from './objects/building/building.component'
import { GorillaComponent } from './objects/gorilla/gorilla.component'
import { ShapeComponent } from './objects/shape/shape.component'
import { SunComponent } from './objects/sun/sun.component'
import { WindComponent } from './objects/wind/wind.component'

export interface ShootParameter {
  angle: number;
  velocity: number;
}

@Component({
  selector: 'app-gorilla',
  templateUrl: './gorilla.component.html',
  styleUrls: ['./gorilla.component.css']
})

export class GorillaAppComponent implements OnInit, appComponent {
  
  @ViewChild('player_1_angle') p1a:ElementRef;
  @ViewChild('player_1_velocity') p1v:ElementRef;
  @ViewChild('player_2_angle') p2a:ElementRef;
  @ViewChild('player_2_velocity') p2v:ElementRef;

  name: string;
  description: string;
  image: string;
  players: number;

  paramPlayer1 : ShootParameter;
  paramPlayer2 : ShootParameter;
  service: GorillaService;

  constructor() {

  }
  checkKey(playerId, action) : void {

    if( playerId == 1 ){
      if( action == 'A') {
        this.p1v.nativeElement.focus();
      } else {
        this.shoot(playerId);
      }
    } else {
      if( action == 'A') {
        this.p2v.nativeElement.focus();
      } else {
        this.shoot(playerId);
      }
    }
  }

  ngOnInit() {
    this.paramPlayer1 = {angle : 0, velocity : 0};
    this.paramPlayer2 = {angle : 0, velocity : 0};

    this.name = "Gorilla";
    this.description = "Gorilla";
    this.image = "";
    this.players = 2;
    this.service = new GorillaService();
    this.service.init();
    this.service.createScene();
  }

  shoot(playerId) {

    if( playerId === 1 )
      this.service.throwBanana( this.paramPlayer1.velocity, this.paramPlayer1.angle, playerId );
    else
      this.service.throwBanana( this.paramPlayer2.velocity, this.paramPlayer2.angle, playerId );

  }

}
