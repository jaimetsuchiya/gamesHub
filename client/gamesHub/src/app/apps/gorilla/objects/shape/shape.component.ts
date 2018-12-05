import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {

  context: any;
  canvas: any;

  constructor(
    public _context: any
  ) { 
    this.context = _context;
    this.canvas = document.getElementById('canvas');
  }

  ngOnInit() {
  }
/**
     * circle: Creates basic circles
     * params {Integer} x
     * params {Integer} y
     * params {Integer} width Width of circle
     */
    circle( _x, _y, _width ) {
      this.context.beginPath();
      this.context.arc( _x, _y, _width, 0, Math.PI * 2, true );
      this.context.closePath();
      this.context.fill();
    };

    /**
     * rectangle: Builds basic rectangle
     * params {Integer} x
     * params {Integer} y
     * params {Integer} w Width
     * params {Integer} h Height
     */
    rectangle( _x, _y, _w, _h ) {
      this.context.fillRect( _x, _y, _w, _h );
    };

    /**
     * ellipse: Builds an ellipse
     * params {Integer} x
     * params {Integer} y
     * params {Integer} w Width
     * params {Integer} h Height
     */
    ellipse( _x, _y, _w, _h ) {
      var kappa, ox, oy, xe, ye, xm, ym;
      kappa = 0.5522848;
      ox = (_w / 2) * kappa;
      oy = (_h / 2) * kappa;
      xe = _x + _w;
      ye = _y + _h;
      xm = _x + _w / 2;
      ym = _y + _h / 2;

      this.context.beginPath();
      this.context.moveTo( _x, ym );
      this.context.bezierCurveTo( _x, ym - oy, xm - ox, _y, xm, _y );
      this.context.bezierCurveTo( xm + ox, _y, xe, ym - oy, xe, ym );
      this.context.bezierCurveTo( xe, ym + oy, xm + ox, ye, xm, ye );
      this.context.bezierCurveTo( xm - ox, ye, _x, ym + oy, _x, ym );
      this.context.closePath();
      this.context.fill();
    };
}
