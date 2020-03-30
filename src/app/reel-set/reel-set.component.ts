import { Component, OnInit, ViewChild, QueryList, ViewChildren, OnDestroy } from '@angular/core';
import { CONSTANTS } from 'src/app/config/constants';
import { ReelComponent } from '../reel/reel.component';
import { IAppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectSpinning, selectGameObject } from '../store/selectors/game.selectors';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SetSpinDisabled, SetResultCounter } from '../store/actions/game.actions';

@Component({
  selector: 'app-reel-set',
  templateUrl: './reel-set.component.html',
  styleUrls: ['./reel-set.component.scss']
})
export class ReelSetComponent implements OnInit, OnDestroy {

  @ViewChildren('reelComp') reelsComp: QueryList<ReelComponent>;
  reelsNumber: number = CONSTANTS.REELS;
  reels: any[];
  spinDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  resultSetCounter = 0;
  winningLines;
  winningCombinations = [];
  lines = CONSTANTS.LINES;

  constructor(
    private store: Store<IAppState>,
  ) {
    this.reels = Array(this.reelsNumber).fill(null);
  }

  ngOnInit() {
    this.subscribeToSpin();
  }

  ngOnDestroy() {
    this.spinDestroyed$.next(true);
    this.spinDestroyed$.complete();
  }

  onSpin() {
  }

  private subscribeToGame() {
    this.store.select(selectSpinning)
      .pipe(takeUntil(this.spinDestroyed$))
      .subscribe((spinning) => {
        if (spinning) {
          this.reelsComp.forEach((reel, idx) => {
            reel.spin(idx);
          });
        }
      });
  }

  private subscribeToSpin() {
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
          console.log(game.resultSetCounter);
          this.evaluateResults(spinningResults);
          this.store.dispatch(new SetResultCounter(0));
        }
      });
  }

  private evaluateResults(spinResults) {
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

  private highlightWinningSymbols(combination, last) {
    setTimeout(() => {
      this.highlight(combination, true);
    }, 0);
    setTimeout(() => {
      this.highlight(combination, false);
      if (last) {
        this.store.dispatch(new SetSpinDisabled(false));
      }
    }, 500);
  }

  private highlight(combination, validity) {
    combination.forEach(comb => {
      this.reelsComp.forEach((reel, idx) => {
        if (idx === comb[0]) {
          reel.highlightAtIndex(comb, validity);
        }
      });
    });
  }

  // private highlightWinningLines(currentIndex) {
  //   if (!this.winningLines.length) {
  //     return;
  //   }
  //   if (currentIndex > 0) {
  //     this.lines[this.winningLines[currentIndex - 1]].map((el) => {
  //       this.reelsComp.forEach((reel, index) => {
  //         if (el[0] === index) {
  //           reel.highlightAtIndex(el[1], false);
  //         }
  //       })
  //     });
  //   }
  //   if (currentIndex > this.winningLines.length - 1) {
  //     return;
  //   }
  //   this.lines[this.winningLines[currentIndex]].map((el) => {
  //     this.reelsComp.forEach((reel, index) => {
  //       if (el[0] === index) {
  //         reel.highlightAtIndex(el[1], true);
  //       }
  //     })
  //   });
  //   setTimeout(() => {
  //     this.highlightWinningLines(currentIndex + 1);
  //   }, 800);
  // }

}
