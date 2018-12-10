import { Component, Input }	from '@angular/core';
import { Pawn }		from '../pieces';
import { CheckersService }	   from '../../checkers.service';

@Component({
  selector: 'app-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.css']

})
export class PawnComponent {

  @Input() pawn: Pawn;

}
