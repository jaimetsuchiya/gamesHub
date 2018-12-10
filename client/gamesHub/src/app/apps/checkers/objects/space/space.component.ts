import { Component, OnInit, Input } from '@angular/core';
import { Space }	from '../space';
import { CheckersService }	   from '../../checkers.service';


@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
	styleUrls: ['./space.component.css']

})

export class SpaceComponent {
  @Input() space: Space;

  // service: CheckersService;
	constructor(    private service: CheckersService
    ) {
      //  this.service = new CheckersService();
  }

}
