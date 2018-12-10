import { Component } 	         from '@angular/core';
import { OnInit } 		         from '@angular/core';
import { BoardComponent }      from './objects/board/board.component';
import { ConsoleComponent }    from './objects/console/console.component';
import { CheckersService }	   from './checkers.service';
import { Observable }      		 from 'rxjs';
import { BehaviorSubject }     from 'rxjs';

@Component({
  selector: 'app-checkers',
  templateUrl: './checkers.component.html',
  styleUrls: ['./checkers.component.css'],
  providers: [ CheckersService ]

})
export class CheckersComponent implements OnInit {

  isWinner = false;
	winner: string = null;

	// Observables
    public isWinner$: Observable<string>;

    // Behavior Subjects
	public _resetGame: BehaviorSubject<boolean>;

	constructor(
  		  private service: CheckersService
  	) {}

  	ngOnInit() {
  		// Observables
  		this.isWinner$ = this.service.isWinnerObs;
  		this.isWinner$.subscribe(w => {
  			if (w !== "none") {
  				this.isWinner = true;
  				this.winner = w;
  			}
  			else {
  				this.isWinner = false;
  				this.winner = "none";
  			}
  		});

  		// Behavior Subjects
		this._resetGame = this.service.resetGameBeh;
  	}

	onReset() {
		this._resetGame.next(true);
	}


}
