import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wind',
  templateUrl: './wind.component.html',
  styleUrls: ['./wind.component.css']
})
export class WindComponent implements OnInit {

  context: any;
  canvas: any;
  windSpeed: number;
  windLine: number;
  arrowDir: number;
  
  constructor(
    public _context: any
  ) {
    this.context = _context;
   }

  ngOnInit() {
    this.canvas = document.getElementById('canvas');
    this.windSpeed = Math.floor( Math.random() * 10 - 5 );
    if ( Math.floor( Math.random() * 3 ) === 1 ) {
      if ( this.windSpeed > 0 ) {
        this.windSpeed += Math.floor( Math.random() * 10 );
      } else {
        this.windSpeed -= Math.floor( Math.random() * 10 );
      }
    }
  }
    /**
   * create: Build out the Wind display
   */
  create() {
      if ( this.windSpeed !== 0 ) {
        this.windLine = this.windSpeed * 3 * ( this.canvas.width / 320 );
        this.context.strokeStyle = 'rgb( 245, 11, 11 )';
        this.context.beginPath();
        this.context.moveTo( this.canvas.width / 2, this.canvas.height - 5 );
        this.context.lineTo( this.canvas.width / 2 + this.windLine, this.canvas.height - 5 );
        if ( this.windSpeed > 0 ) {
          this.arrowDir = -2;
        } else {
          this.arrowDir = 2;
        }
        this.context.moveTo( this.canvas.width / 2 + this.windLine, this.canvas.height - 5 );
        this.context.lineTo( this.canvas.width / 2 + this.windLine + this.arrowDir, this.canvas.height - 5 - 2 );
        this.context.moveTo( this.canvas.width / 2 + this.windLine, this.canvas.height - 5 );
        this.context.lineTo( this.canvas.width / 2 + this.windLine + this.arrowDir, this.canvas.height - 5 + 2 );
        this.context.stroke();
      }
    };
}
