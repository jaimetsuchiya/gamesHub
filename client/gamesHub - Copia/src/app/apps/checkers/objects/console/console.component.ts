import { Component, OnInit }	from '@angular/core';
import { CheckersService }		from '../../checkers.service';
import { Observable }			    from 'rxjs';
import { BehaviorSubject }    from 'rxjs';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.css']

})
export class ConsoleComponent implements OnInit {

  public turn: string = null;

	// Observables
	public redTurn$: Observable<boolean>;

	// Behavior Subjects
	public _resetGame: BehaviorSubject<boolean>;
	
	constructor(
	  	private service: CheckersService
	) {}

	ngOnInit() {
		//Observables
		this.redTurn$ = this.service.redTurnObs;
		this.redTurn$.subscribe(redTurn => {
			this.turn = redTurn ? 'Red' : 'Black';
		});

		// Behavior Subjects
		this._resetGame = this.service.resetGameBeh;
		this._resetGame.subscribe(reset => {
			this.turn = 'Red'; // When the game is reset by someone else set the turn to Red
		});
	}

	resetGame() {
		this._resetGame.next(true);
	}

}
