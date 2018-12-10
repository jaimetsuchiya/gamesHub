import { Component, OnInit } from '@angular/core';
import { BananaComponent } from '../banana/banana.component';
import { ShapeComponent } from '../Shape/shape.component';

@Component({
  selector: 'app-gorilla',
  templateUrl: './gorilla.component.html',
  styleUrls: ['./gorilla.component.css']
})
export class GorillaComponent implements OnInit {
    BODY_COLOR : string;
    BODY_LINE  : string;
    context : CanvasRenderingContext2D;
    playerNumber : number;
    width : number;
    height : number;
    wins : number;
    dead : boolean;
    animate : boolean;
    directionRight : string;
    directionLeft : string;
    animations : number;
    explosionWidth : number;
    explosionHeight : number;
    oldY : boolean;
    timer : number;
    justThrown : boolean;
    x: number;
    y: number;
    banana: BananaComponent;
    
  constructor() {}

  ngOnInit() {
    
  }

    init( _context: CanvasRenderingContext2D, _playerNumber: number): void
    {
      this.playerNumber = _playerNumber;
      this.oldY = false;
      this.context = _context;
      this.width = 40;
      this.height = 40;
      this.wins = 0;
      this.animations = 0;
      this.explosionWidth = 40;
      this.explosionHeight = 40;
      this.directionRight = 'down';
      this.directionLeft = 'up';
      this.timer = 0;
      this.dead = false;
      this.animate = false;
      this.justThrown = false;
      this.BODY_COLOR = 'rgb( 255, 170, 82 )';
      this.BODY_LINE  = 'rgb( 0, 0, 160 )';
    };
    
    /**
     * create: Build the player out
     * Depending on state, hands will be either down or up for throwing
     * else, we display the player as dead.
     * params {Integer} x
     * params {Integer} y
     */
    create( _x, _y ) {

      if ( this.dead ) {
        this.renderDead();
        return;
      }

      this.x = _x;

      // We need to keep the Gorillas in the same spot when re-rendering
      if ( !this.oldY ) {
        this.oldY = true;
        this.y = _y - 47; // Move the Gorilla up out of the building
      } else {
        this.y = _y;
      }

      // Draw the Head
      this.context.fillStyle = this.BODY_COLOR;
      this.context.fillRect( this.x - 4, this.y,  7, 7 );
      this.context.fillRect( this.x - 5, this.y + 2, 9, 3 );

      // Draw the eyes/brow
      this.context.fillStyle = this.BODY_LINE;
      this.context.fillRect( this.x - 3, this.y + 2, 5, 1 );
      this.context.fillRect( this.x - 3, this.y + 4, 2, 1 );
      this.context.fillRect( this.x, this.y + 4, 2, 1 );

      // Draw the Neck
      this.context.fillStyle = this.BODY_COLOR;
      this.context.fillRect( this.x - 3, this.y + 7, 5, 1 );

      // Draw the Body
      this.context.fillRect( this.x - 9, this.y + 8, 17, 7 );
      this.context.fillRect( this.x - 7, this.y + 15, 13, 6 );

      // Draw the Legs
      for ( var i = 0; i < 4; i++ ) {
        this.context.strokeStyle = this.BODY_COLOR;
        this.context.beginPath();
        // Left Leg
        this.context.arc( this.x + 2 + i, this.y + 25, 10, 3 * Math.PI / 4, 9 * Math.PI / 8, false );
        this.context.stroke();
        this.context.beginPath();
        // Right Leg
        this.context.arc( this.x - 3 - i, this.y + 25, 10, 15 * Math.PI / 8, Math.PI / 4, false );
        this.context.stroke();
      }

      // Draw the Chest
      this.context.strokeStyle = this.BODY_LINE;
      this.context.beginPath();
      this.context.arc( this.x - 5, this.y + 10, 4.9, 0, 3 * Math.PI / 5, false );
      this.context.stroke();
      this.context.beginPath();
      this.context.arc( this.x + 4, this.y + 10, 4.9, 3 * Math.PI / 7, 4 * Math.PI / 4, false );
      this.context.stroke();

      if ( this.animate ) {
        // DANCE GORILLA DANCE!!!
        if ( this.directionLeft === 'up' ) {
            this.animateArms( 'leftArm', [15, 3 * Math.PI / 4, 5 * Math.PI / 4, false], 'down' );
        } else {
            this.animateArms( 'leftArm', [5, 3 * Math.PI / 4, 5 * Math.PI / 4, false], 'up');
        }
        if ( this.directionRight === 'up' ) {
            this.animateArms( 'rightArm', [15, 7 * Math.PI / 4, Math.PI / 4, false],'down' );
        } else {
            this.animateArms( 'rightArm', [5, 7 * Math.PI / 4, Math.PI / 4, false], 'up' );
        }
      } else {
        // Draw the Arms
        // default for now... both arms down
        for ( var i = -5; i < -1; i++ ) {
          this.context.strokeStyle = this.BODY_COLOR;
          // Left Arm
          this.context.beginPath();
          this.context.arc( this.x + 1 + i , this.y + 15, 9, 3 * Math.PI / 4, 5 * Math.PI / 4, false );
          this.context.stroke();
          // Right Arm
          this.context.beginPath();
          this.context.arc( this.x - 2 - i , this.y + 15, 9, 7 * Math.PI / 4, Math.PI / 4, false );
          this.context.stroke();
        }
      }
    };

    /**
     * animateArms: If we are dancing, lets pick the right arms to dance with
     * params {String} arm Which arm do we want to control
     * params {Array} arc Where to draw the arms
     * params {String} direction
     */
    animateArms( arm, arc, direction ) {
      this.context.strokeStyle = this.BODY_COLOR;
      for ( var i = -5; i < -1; i++ ) {
        if ( arm === 'leftArm' ) {
          this.context.beginPath();
          this.context.arc( this.x + 1 + i , this.y + arc[0], 9, arc[1], arc[2], arc[3] );
          this.context.stroke();
        }
        if ( arm === 'rightArm' ) {
          this.context.beginPath();
          this.context.arc( this.x - 2 - i , this.y + arc[0], 9, arc[1], arc[2], arc[3] );
          this.context.stroke();
        }
      }
      if ( arm === 'leftArm' ) this.directionLeft = direction;
      if ( arm === 'rightArm' ) this.directionRight = direction;
    };

    /**
     * reCreate: Does what it says
     */
    reCreate() {
      this.create( this.x, this.y );
    };

    /**
     * getBanana: create a new banana object
     * params {Integer} force
     * params {Integer} angle
     * params {Object} wind
     */
    getBanana( force, angle, wind ) {
      this.banana = new BananaComponent();
      this.banana.init(this.context, this.x, this.y - 17, force, angle, wind );
    };

    /**
     * renderDead: Draw the Gorilla as dead
     */
    renderDead () {
      this.context.fillStyle = 'rgb( 0, 0, 160 )';
      var shape = new ShapeComponent();
      shape.init(this.context);
      shape.ellipse( this.x - this.width * 2, this.y, 2.5 * this.explosionWidth, this.explosionHeight );
    };

    /**
     * animateColission: Lets make the player appear to explode
     */
    animateColission() {
      var width, height, shape;
      this.context.fillStyle = 'rgb( 245, 11, 11 )';
      this.explosionWidth += 20;
      this.explosionHeight += 20;
      width = this.explosionWidth;
      height = this.explosionHeight;
      shape = new ShapeComponent();
      shape.init(this.context);
      shape.ellipse( this.x - this.width * 2, this.y, 2.5 * width, height );
    };

    /**
     * throwBanana: Lets render the players arm up when throwing
     * params {Integer} time
     */
    throwBanana( _time ) {

      // Not sure if this is the cleanest way to do this but it works
      // This will reset the direction for each arm so that we render it correctly
      // During the "throw"
      if ( this.timer < 1 ) {
        this.animate = true;
        if ( this.playerNumber === 1 ) {
          this.directionRight = 'up';
          this.directionLeft = 'down';
        } else {
          this.directionRight = 'down';
          this.directionLeft = 'up';
        }
        this.timer++;
      } else {
        this.animate = false;
      }
      this.banana.createFrame( _time, this.playerNumber );
    };

    /**
     * checkColission: See if player has been hit
     * params {Integer} x
     * params {Integer} y
     * returns {Boolean}
     */
    checkColission( _x, _y ) {
      if ( this.y <= _y && _x > this.x - this.width / 2 && _x < this.x + this.width / 2 ) {
        this.dead = true;
        return true;
      }
      return false;
    };

    /**
     * animateWin: Lets animate
     */
    animateWin() {
      // TODO: make sure gorilla does his dance
      this.animations++;
    };
}
