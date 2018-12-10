import { Component, Input }	from '@angular/core';
import { King }				from '../pieces';
import { CheckersService }	   from '../../checkers.service';


@Component({
  selector: 'app-king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.css']

})
export class KingComponent {

  @Input() king: King;

}
