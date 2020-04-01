import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { SetSpinning } from '../store/actions/game.actions';
import { ReplaySubject } from 'rxjs';
import { selectSpinDisabled } from '../store/selectors/game.selectors';
import { takeUntil } from 'rxjs/operators';
import { playAudio } from '../helpers/general.helper';
import { selectBetAndBalance } from '../store/selectors/money.selectors';
import { StartBet } from '../store/actions/money.actions';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit, OnDestroy {

  spinDisabled: boolean;
  bet: number;
  balance: number;
  spinDisabledDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  betDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  audio = new Audio();
  rotatedButton = false;

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.subscribeToSpinDisabled();
    this.subscribeToBet();
  }

  ngOnDestroy() {
    this.spinDisabledDestroyed$.next(true);
    this.spinDisabledDestroyed$.complete();
    this.betDestroyed$.next(true);
    this.betDestroyed$.complete();
  }

  handleSpin() {
    playAudio('assets/sounds/rolling.mp3', this.audio);
    this.store.dispatch(new SetSpinning(true));
    this.store.dispatch(new StartBet(this.bet));
    this.store.dispatch(new SetSpinning(false));
  }

  startNewGame() {
    window.location.reload();
  }

  private subscribeToSpinDisabled() {
    this.store.select(selectSpinDisabled)
      .pipe(takeUntil(this.spinDisabledDestroyed$))
      .subscribe((spinDis) => {
        this.spinDisabled = spinDis;
        this.rotatedButton = spinDis;
      });
  }

  private subscribeToBet() {
    this.store.select(selectBetAndBalance)
      .pipe(takeUntil(this.betDestroyed$))
      .subscribe((res) => {
        this.bet = res.bet;
        this.balance = res.balance;
      });
  }

}
