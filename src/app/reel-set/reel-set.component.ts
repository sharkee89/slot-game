import { Component, OnInit, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CONSTANTS } from 'src/app/config/constants';
import { playAudio } from '../helpers/general.helper';
import { ReelComponent } from '../reel/reel.component';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SetSpinDisabled, SetResultCounter } from '../store/actions/game.actions';
import { WinBet } from '../store/actions/money.actions';
import { selectGameObject } from '../store/selectors/game.selectors';
import { selectBet } from '../store/selectors/money.selectors';
import { IAppState } from '../store/state/app.state';

@Component({
  selector: 'app-reel-set',
  templateUrl: './reel-set.component.html',
  styleUrls: ['./reel-set.component.scss']
})
export class ReelSetComponent implements OnInit, OnDestroy {

  @ViewChildren('reelComp') reelsComp: QueryList<ReelComponent>;
  reelsNumber: number = CONSTANTS.REELS;
  lines = CONSTANTS.LINES;
  reels: any[];
  bet: number;
  resultSetCounter = 0;
  winningCombinations = [];
  winningLines;
  spinDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  betDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  audio = new Audio();


  constructor(
    private store: Store<IAppState>,
  ) {
    this.reels = Array(this.reelsNumber).fill(null);
  }

  ngOnInit(): void {
    this.subscribeToSpin();
    this.subscribeToBet();
  }

  ngOnDestroy(): void {
    this.spinDestroyed$.next(true);
    this.spinDestroyed$.complete();
    this.betDestroyed$.next(true);
    this.betDestroyed$.complete();
  }

  private subscribeToBet(): void {
    this.store.select(selectBet)
      .pipe(takeUntil(this.betDestroyed$))
      .subscribe((bet) => {
        this.bet = bet;
      });
  }

  private subscribeToSpin(): void {
    this.store.select(selectGameObject)
      .pipe(takeUntil(this.spinDestroyed$))
      .subscribe((game) => {
        if (game.spinning) {
          this.reelsComp.forEach((reel, idx) => {
            reel.spin(idx);
          });
        }
        if (!!game.resultSetCounter && game.resultSetCounter % 5 === 0) {
          const spinningResults = [
            game.resultOne,
            game.resultTwo,
            game.resultThree,
            game.resultFour,
            game.resultFive
          ];
          this.evaluateResults(spinningResults);
          this.store.dispatch(new SetResultCounter(0));
        }
      });
  }

  private evaluateResults(spinResults): void {
    this.winningLines = [];
    this.winningCombinations = [];
    for (let lineIdx = 0; lineIdx < this.lines.length; lineIdx++) {
      let streak = 0;
      let currentKind = null;
      for (let coordIdx = 0; coordIdx < this.lines[lineIdx].length; coordIdx++) {
        const coords = this.lines[lineIdx][coordIdx];
        const symbolAtChords = spinResults[coords[0]][coords[1]];
        if (coordIdx === 0) {
          if (symbolAtChords === 'S') {
            break;
          }
          currentKind = symbolAtChords;
          streak = 1;
        } else {
          if (symbolAtChords !== currentKind) {
            break;
          }
          streak += 1;
        }
      }
      if (streak >= 3) {
        this.winningLines.push(lineIdx);
        this.winningCombinations.push(this.lines[lineIdx]);
      }
    }
    console.log(this.winningLines);
    this.winningCombinations.forEach((winningCombination, index) => {
      setTimeout(() => {
        this.highlightWinningSymbols(winningCombination, this.winningCombinations.length === (index + 1));
      }, 1000 + index * 1000);
    });
    if (!this.winningCombinations.length) {
      this.store.dispatch(new SetSpinDisabled(false));
    }
  }

  private highlightWinningSymbols(combination, last): void {
    this.store.dispatch(new WinBet(3 * this.bet));
    setTimeout(() => {
      this.highlight(combination, true);
      playAudio('assets/sounds/win.mp3', this.audio);
    }, 0);
    setTimeout(() => {
      this.highlight(combination, false);
      if (last) {
        this.store.dispatch(new SetSpinDisabled(false));
      }
    }, 500);
  }

  private highlight(combination, validity): void {
    combination.forEach(comb => {
      this.reelsComp.forEach((reel, idx) => {
        if (idx === comb[0]) {
          reel.highlightAtIndex(comb, validity);
        }
      });
    });
  }

}
