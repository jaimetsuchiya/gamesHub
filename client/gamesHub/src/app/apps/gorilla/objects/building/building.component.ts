import { Component, OnInit } from '@angular/core';
import { ShapeComponent } from '../Shape/shape.component';


export interface BuildingWindow {
  x: number;
  y: number;
  color: string;
}

export interface ColisionArgs {
  x: number;
  y: number;
}

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  context : CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  height: number;
  width : number;
  baseHeight : number;
  baseLine : number;
  spacing : number;
  windowHeight : number;
  windowWidth : number;
  buildingColors : string[];
  buildingColor  : string;
  windows : BuildingWindow[];
  colissions : ColisionArgs[];
  x: number;
  y: number;
  color: string;

  constructor(){}

    init(
      _canvas: HTMLCanvasElement,
      _context: CanvasRenderingContext2D): void {
      this.canvas = _canvas;
      this.context = _context;
      this.width = 37 + Math.floor( Math.random() * 70 );
      this.baseHeight = 80;
      this.baseLine = 335;
      this.spacing = 1;
      this.windowHeight = 7;
      this.windowWidth = 4;
      this.buildingColors = ['rgb( 173, 170, 173 )', 'rgb( 0, 170, 173 )', 'rgb( 173, 0, 0 )'];
      this.buildingColor = null;
      this.windows = [];
      this.colissions = [];
    };

  ngOnInit() {
    
  }

    /**
     * positionAtX: Where are we at x
     * returns {Integer}
     */
    positionAtX() {
      return this.x;
    };

    /**
     * positionAtY: Where are we at y
     * returns {Integer}
     */
    positionAtY() {
      return this.canvas.height - this.height;
    };

    /**
     * endPosition: Where does this building end
     * returns {Integer}
     */
    endPosition() {
      return this.positionAtX() + this.width + this.spacing;
    };

    /**
     * middlePosition: Locate the middle of the building
     * returns {Integer}
     */
    middlePosition() {
      return this.positionAtX() + ( this.endPosition() - this.positionAtX() ) / 2;
    };

    /**
     * create: Build out the building
     * params {Integer} x
     * params {Integer} y
     */
    create( _x, _y ) {
      this.x = _x;
      this.y = _y;
      this.buildingColor = this.buildingColor || this.buildingColors[ Math.floor(Math.random() * (3 - 0) + 0) ];
      this.context.fillStyle = this.buildingColor;
      this.height = this.baseHeight + _y;
      this.context.fillRect( this.positionAtX(), this.baseLine - this.height, this.width, this.height );
      this.createWindows( this.positionAtX(), this.positionAtY() );
    };

    /**
     * reCreate: Re-Build the buildings
     */
    reCreate() {
      this.create( this.x, this.y );
    };

    /**
     * createWindows: Create as many windows as the building can hold based on it's size.
     * If there is windows already for the recreate, lets use those instead.
     * params {Integer} x
     * params {Integer} y
     */
    createWindows( _x, _y ) {
      var rows, windowsPerFloor, currentDistance, totalHeight, results, w, winLength, winRef, i;
      if ( this.windows.length > 0 ) {
        winRef = this.windows;
        for ( i = 0, winLength = winRef.length; i < winLength; i++ ) {
          w = winRef[i];
          this.createWindow( w.x, w.y, w.color );
        }
        return;
      }
      rows = Math.round( this.width + this.windowWidth );
      windowsPerFloor = Math.floor( this.width / this.windowWidth + this.windowHeight );
      for ( var row = 3; row < Math.floor( this.width - 11 + this.windowWidth ); row += 11 ) {
        for ( var column = 3; column < Math.floor( this.height - 15 ); column += 15 ) {
          this.color = ( Math.floor(Math.random() * 5) > 0 ) ? 'rgb( 255, 255, 82 )' : 'rgb( 82, 85, 82 )';
          this.createWindow( _x + 1 + row, Math.floor( (this.baseLine - this.height) + 1 + column ), this.color );
          var objWindow = {
            x: _x + 1 + row,
            y: Math.floor( (this.baseLine - this.height) + 1 + column ),
            color: this.color
          };
          this.windows.push(objWindow);
        }
      }
    };

    /**
     * createWindow: Build the window
     * params {Integer} x
     * params {Integer} y
     * params {String} color
     */
    createWindow( _x, _y, _color ) {
      this.context.fillStyle = _color;
      this.context.fillRect( _x, _y, this.windowWidth, this.windowHeight );
    };

    /**
     * checkColission: Has the building been hit?
     * params {Integer} x
     * params {Integer} y
     * returns {Boolean}
     */
    checkColission( _x, _y ) {
      if ( this.positionAtY() - 25 <= _y && ( _x > this.x && _x < this.x + this.width + 10 ) ) {
        var colisionArgs = {
          x: _x - 20,
          y: _y
        };
        this.colissions.push(colisionArgs);
        this.createColission( _x - 20, _y );
        return true;
      }
      return false;
    };

    /**
     * createColission: Draw colission if we hit the building
     * params {Integer} x
     * params {Integer} y
     */
    createColission( _x, _y ) {
      var width, height, shape;
      width = 25;
      height = 15;
      this.context.fillStyle = 'rgb( 0, 0, 160 )';
      shape = new ShapeComponent();
      shape.init(this.context);
      shape.ellipse( _x, _y, width, height );
    };

    /**
     * reCreateColissions: On building reCreate, lets draw the colissions again
     */
    reCreateColissions() {
      if ( this.colissions.length > 0 ) {
        for ( var i = 0; i < this.colissions.length; i++ ) {
          var colission = this.colissions[i];
          this.createColission( colission[0], colission[1] );
        }
      }
    };
}
