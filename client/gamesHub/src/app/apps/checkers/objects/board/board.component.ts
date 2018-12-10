import { forwardRef, Component, Optional }	     from '@angular/core';
import { OnInit } 		        from '@angular/core';
import { CheckersService }	    from '../../checkers.service';
import { Observable }           from 'rxjs';
import { Space }                from '../space';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public board: any;

  // Observables
  public resetGame$: Observable<boolean>;

  constructor(private service: CheckersService) {
  }

  ngOnInit() {
      //Observables
      this.resetGame$ = this.service.resetGameObs;
      this.resetGame$.subscribe(reset => {
          if (reset) {
              this.onReset();
          }
      });

      // Always reset game on init anyway
      this.onReset();
  }

  onReset() {
      this.service.resetGame();
      this.board = this.service.board;
  }
}
