import { Component, OnInit } from '@angular/core';
import { ShapeComponent } from '../Shape/shape.component';

@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.css']
})
export class SunComponent implements OnInit {

  SUN_BODY_COLOR : string;
  SUN_EYES_COLOR : string;

  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  mouth: boolean;
  width: number;
  height: number;
  position: number;

  constructor(){}

  init(
      _canvas: HTMLCanvasElement,
     _context:CanvasRenderingContext2D
  ):void  {
    this.canvas = _canvas;
    this.mouth = false;
    this.width = 10;
    this.height = 27;
    this.position = ( this.canvas.width / 2 );
    this.context = _context;
    this.SUN_BODY_COLOR = "rgb( 255, 255, 0 )";
    this.SUN_EYES_COLOR = "rgb( 0, 0, 160 )";

   }

  ngOnInit() {

  }
/**
     * create: Begin sun build-out
     * params {Boolean} hit
     */
    create ( hit ) {
      if ( hit ) this.mouth = true;
      this.createRays();
      this.createBody();
      this.createEyes();
      this.createMouth();
    };

    /**
     * createBody: Build the sun's body
     */
    createBody() {
      var shape = new ShapeComponent();
      shape.init(this.context);
      this.context.fillStyle = this.SUN_BODY_COLOR;
      shape.circle( this.position, this.height, this.width );
    };

    /**
     * createEyes: Build left/right eye(s)
     */
    createEyes () {
      var shape = new ShapeComponent();
      shape.init(this.context);
      this.context.fillStyle = this.SUN_EYES_COLOR;
      // create left eye
      shape.circle( this.position - 2.5, this.height - 2.5, 1 );
      // create right eye
      shape.circle( this.position + 2.5, this.height - 2.5, 1 );
    };

    /**
     * createRays: Build sun rays
     */
    createRays () {
      // Helper Method
      // TODO: may extract this
      function createRay ( a ) {
        this.context.moveTo( this.position, this.height );
        return this.context.lineTo( this.position + 20 * Math.cos(a), this.height + 20 * Math.sin(a) );
      }
      
      this.context.strokeStyle = this.SUN_BODY_COLOR;
      this.context.beginPath();
      this.context.lineWidth = 1;
      for (var i = 0; i < 16; i++) {
        createRay.call( this, 360 * i / 4.5 );
      }
      this.context.stroke();
    };

    /**
     * createMouth: Build out the mouth in the smile or shocked state
     */
    createMouth () {
      this.context.fillStyle = this.SUN_BODY_COLOR;
      this.context.strokeStyle = this.SUN_EYES_COLOR;
      if ( this.mouth ) {
        this.context.fillStyle = this.SUN_EYES_COLOR;
        var shape = new ShapeComponent();
        shape.init(this.context);
        shape.circle( this.position, this.height + 5, this.width / 4 );
      } else {
        this.context.beginPath();
        this.context.arc( this.position, this.height + 1, this.width / 2, 0.25, 2.9, false );
        this.context.stroke();
      }
    };
}
