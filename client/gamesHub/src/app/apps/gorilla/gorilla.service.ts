import { Injectable } from '@angular/core';
import { BananaComponent } from './objects/banana/banana.component'
import { BuildingComponent } from './objects/building/building.component'
import { GorillaComponent } from './objects/gorilla/gorilla.component'
import { ShapeComponent } from './objects/shape/shape.component'
import { SunComponent } from './objects/sun/sun.component'
import { WindComponent } from './objects/wind/wind.component'

@Injectable({
  providedIn: 'root'
})
export class GorillaService {
  canvas = <HTMLCanvasElement> document.getElementById("canvas");

  empty : boolean;
  width : number;
  height : number;
  sunShock : boolean;
  winner : number[];
  scores : any;
  buildings : BuildingComponent[];
  building: BuildingComponent;
  frameRate : number;
  wind : WindComponent;
  sun : SunComponent;
  timeout: any;
  player_1: GorillaComponent;
  player_2: GorillaComponent;
  nextPlayer: number;
  startTime: Date;
  gorila: GorillaComponent;
  context: CanvasRenderingContext2D;

  constructor() { 
    
  }

    init() {
      this.empty = true;
      this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
      this.context = this.canvas.getContext("2d"); 
      this.width = (this.canvas.width);
      this.height = (this.canvas.height);
      this.sunShock = false;
      this.winner = [];
      this.scores = {
        player_1: 0,
        player_2: 0
      };
      this.nextPlayer = 1;
      this.buildings = [];
      this.frameRate = 15; // Note, this may change
      this.wind = new WindComponent();
      this.wind.init(this.canvas, this.context);
      this.sun = new SunComponent();
      this.sun.init(this.canvas, this.context);
      
    }
  /**
     * createScene: Sets up and rerenders the main scene
     */
    createScene () {
      this.clear();
      this.createSun();
      if ( this.empty ) {
        this.empty = false;
        this.createBuildings();
        this.createGorillas();
        this.wind = new WindComponent();
        this.wind.init(this.canvas, this.context);
      } else {
        this.reCreateBuildings();
        this.reCreateColissions();
        this.reCreateGorillas();
      }
      this.wind.create();
      this.updateScore();
    };

    /**
     * createBuildings: Begins building construction
     * We continue to build until we reach the end of the screen
     */
    createBuildings() {
      var position = 0;
      while ( position < this.width ) {
        var building = this.createBuilding( position );
        position = building.endPosition();
      }
    };

    /**
     * createBuilding: Builds individual building
     * param {Integer} x The position to start building
     * returns {Object} building Returns a new building object
     */
    createBuilding ( x ) {
      var building = new BuildingComponent();
      building.init(this.canvas, this.context);
      var y = Math.floor( Math.random() * 150 );
      building.create( x, y );
      this.buildings.push( building );
      return building;
    };

    /**
     * reCreateBuildings: start re-creating our buildings
     */
    reCreateBuildings () {
      for ( var i = 0; i < this.buildings.length; i++ ) {
        this.buildings[i].reCreate();
      }
    };

    /**
     * reCreateCollions: start re-creating our destruction
     */
    reCreateColissions  () {
      for ( var i = 0; i < this.buildings.length; i++ ) {
        this.buildings[i].reCreateColissions();
      }
    };

    /**
     * createSun: Builds the happy/shocked sun
     */
    createSun  () {
      if ( this.sunShock ) {
        this.sun.create( true );
      } else {
        this.sun.create(false);
      }
    };

    /**
     * clear: Reset the canvas
     */
    clear() {
      return this.canvas.width = this.canvas.width;
    };

    /**
     * clearTimeout: does what it says
     */
    clearTimeouts () {
      clearTimeout( this.timeout );
    };

    /**
     * createGorillas: Builds out Player_1 && Player_2
     */
    createGorillas  () {
      var buildingOnePosition, buildingTwoPosition, building;

      // Build and position Player_1
      buildingOnePosition = Math.floor( Math.random() * this.buildings.length / 2 );
      building = this.buildings[ buildingOnePosition ];
      this.player_1 = new GorillaComponent();
      this.player_1.init(this.context, 1);
      this.player_1.create( building.middlePosition(), building.positionAtY() );

      // Build and position Player_2
      buildingTwoPosition = Math.floor( Math.random() * (this.buildings.length - 2 - buildingOnePosition) ) + buildingOnePosition + 1;
      building = this.buildings[ buildingTwoPosition ];
      this.player_2 = new GorillaComponent();
      this.player_2.init(this.context, 2);
      this.player_2.create( building.middlePosition(), building.positionAtY() );
    };

    /**
     * reCreateGorillas: Re-Build players on reCreate
     */
    reCreateGorillas () {
      this.player_1.reCreate();
      this.player_2.reCreate();
    };

    /**
     * throwBanana: Start the banana animation
     * params {Integer} force Input from user for velocity
     * params {Integer} angle Input from user for Angle
     * params {Integer} player Which player are we doing this for?
     */
    throwBanana  ( force, angle, player ) {
      var that = this;
      if ( player === 2 ) {
        angle = -angle;
        force = -force;
      }
      player = this['player_' + player];
      player.getBanana( force, angle, this.wind.windSpeed );
      //this.animateBanana( player ); 
      this.timeout = setTimeout( function () {
        that.startTime = new Date();
        that.animateBanana( player );
      }, this.frameRate );
    };

    /**
     * updateScore: Draws/ReDraws the score with updated stats
     */
    updateScore  () {
      // TODO: Set fill Style and font to be a global object value
      this.context.fillStyle = 'rgb( 0, 0, 160 )';
      this.context.font = 'bold 14px courier';
      this.context.fillRect( this.width / 2 - 45, this.height - 40, 90, 13 );
      this.context.fillStyle = 'rgb( 255, 255, 255 )';
      this.context.fillText(this.scores.player_1 + '>Score<' + this.scores.player_2, this.width / 2 - 37, this.height - 30 );
    };

    /**
     * animateBanana: Draw the banana across the screen until we have hit something
     * params {Object} player Which player is this banana coming from?
     */
    animateBanana ( player ) {
      var that, now, time;
      that = this;
      this.timeout = setTimeout( function () {
        that.createScene();
        if ( that.bananaHitSun( player ) ) that.sunShock = true;
        if ( that.bananaHitGorilla( player ) ) return;
        if ( that.bananaHasHit( player ) ) {
          that.nextPlayerTurn( player );
          return;
        }
        if ( that.withinBoundries( player.banana.x(), player.banana.y() ) === false ) {
          that.nextPlayerTurn( player );
          return;
        }
        now = new Date();
        time = now - that.startTime;

        player.throwBanana( time / 1000 );
        that.animateBanana( player );
      }, this.frameRate );
    };

    /**
     * bananaHitSun: Check if the banana has passed through the sun
     * params {Object} player Which player is throwing this banana
     * returns {Boolean}
     */
    bananaHitSun ( player ) {
      var x = player.banana.x();
      var y = player.banana.y();
      if ( x <= (this.width / 2) + 10 && x >= (this.width / 2) - 10 && y <= 27 && y >= 17 ) {
        return true;
      }
      return false;
    };

    /**
     * bananaHasHit: Did we hit something?
     * params {Object} player Which player was throwing said banana
     * returns {Boolean}
     */
    bananaHasHit ( player ) {
      var x = player.banana.x();
      var y = player.banana.y();
      for ( var i = 0; i < this.buildings.length; i ++ ) {
        if ( this.buildings[i].checkColission( x, y ) ) return true;
      }
      return false;
    };

    /**
     * bananaHitGorilla: Check if banana has hit a player
     * params {Object} player Which player tossed the banana
     * returns {Boolean}
     */
    bananaHitGorilla ( player ) {
      var that = this;
      var x = player.banana.x();
      var y = player.banana.y();
      if ( this.player_2.checkColission( x, y ) || this.player_1.checkColission( x, y ) ) {
        var deadPlayer = ( this.player_2.dead === true ) ? this.player_2 : this.player_1;
        var winner = ( this.player_2.dead === false ) ? this.player_2 : this.player_1;
        this.winner.push( winner.playerNumber );
        this.timeout = setTimeout( function () {
          that.animateColission( deadPlayer );
        }, 5 );
        this.scores['player_' + winner.playerNumber]++;
        this.updateScore();
        this.timeout = setTimeout( function () {
          that.startTime = new Date();
          winner.animate = true;
          that.createScene();
          player.animateWin();
          that.animateWin( winner, that.startTime );
        }, this.frameRate );
        return true;
      }
    };

    /**
     * animateColission: fire off explosson
     * params {Object} player Player that was hit
     */
    animateColission ( player ) {
      var that = this;
      this.timeout = setTimeout( function () {
        that.startTime = new Date();
        player.animateColission();
        if ( player.explosionWidth < player.width ) that.animateColission( player );
      }, 0 );
    };

    /**
     * animateWin: Lets make that Gorilla Dance
     * params {Object} player The player to have dance
     * params {Integer} startTime When did this win happen?
     */
    animateWin( player, startTime ) {
      var that = this;
      this.startTime = startTime;
      this.timeout = setTimeout( function () {
        while ( !(player.animate === true && player.animations < 12) ) {
          that.empty = true;
          that.buildings = [];
          that.createScene();
          that.nextPlayerTurn( player );
          return;
        }
        var now = new Date();
        // var time = now - that.startTime;
        that.createScene();
        player.animateWin();
        that.animateWin( player, that.startTime );
      }, 800 );
    };

    /**
     * nextPlayerTurn: change turns
     * params {Object} player Pass in the current player
     */
    nextPlayerTurn ( player ) {
      this.sunShock = false;
      player.timer = 0;
      this.nextPlayer = ( player.playerNumber === 2 ) ? 1 : 2;
    
      // window.showPlayerField( 'player_' + nextPlayer, 'angle' );
    };

    /**
     * withinBoundries: Lets see if the banana is still within the playing field
     * params {Integer} x
     * params {Integer} y
     * returns {Boolean}
     */
    withinBoundries ( _x, _y ) {
      return ( _x < 0 || _x > this.width || _y > this.height ) ? false : true;
    };
}
