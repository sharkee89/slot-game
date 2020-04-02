import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { playAudio } from '../helpers/general.helper';
import { SetSpinning } from '../store/actions/game.actions';
import { StartBet } from '../store/actions/money.actions';
import { selectSpinDisabled } from '../store/selectors/game.selectors';
import { selectBetAndBalance } from '../store/selectors/money.selectors';
import { IAppState } from '../store/state/app.state';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit, OnDestroy {

  spinDisabled: boolean;
  bet: number;
  balance: number;
  rotatedButton = false;
  spinDisabledDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  betDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  audio = new Audio();

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit(): void {
    this.subscribeToSpinDisabled();
    this.subscribeToBet();
  }

  ngOnDestroy(): void {
    this.spinDisabledDestroyed$.next(true);
    this.spinDisabledDestroyed$.complete();
    this.betDestroyed$.next(true);
    this.betDestroyed$.complete();
  }

  handleSpin(): void {
    playAudio('assets/sounds/rolling.mp3', this.audio);
    this.store.dispatch(new SetSpinning(true));
    this.store.dispatch(new StartBet(this.bet));
    this.store.dispatch(new SetSpinning(false));
  }

  startNewGame(): void {
    window.location.reload();
  }

  private subscribeToSpinDisabled(): void {
    this.store.select(selectSpinDisabled)
      .pipe(takeUntil(this.spinDisabledDestroyed$))
      .subscribe((spinDis) => {
        this.spinDisabled = spinDis;
        this.rotatedButton = spinDis;
      });
  }

  private subscribeToBet(): void {
    this.store.select(selectBetAndBalance)
      .pipe(takeUntil(this.betDestroyed$))
      .subscribe((res) => {
        this.bet = res.bet;
        this.balance = res.balance;
      });
  }

}
