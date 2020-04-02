import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SetBet } from '../store/actions/money.actions';
import { selectSpinDisabled } from '../store/selectors/game.selectors';
import { selectBetAndBalance } from '../store/selectors/money.selectors';
import { IAppState } from '../store/state/app.state';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit, OnDestroy {

  bet: number;
  balance: number;
  betDisabled: boolean;
  betDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  spinDisabledDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.subscribeToBet();
    this.subscribeToSpinDisabled();
  }

  ngOnDestroy() {
    this.betDestroyed$.next(true);
    this.betDestroyed$.complete();
    this.spinDisabledDestroyed$.next(true);
    this.spinDisabledDestroyed$.complete();
  }

  private subscribeToBet(): void {
    this.store.select(selectBetAndBalance)
      .pipe(takeUntil(this.betDestroyed$))
      .subscribe((res) => {
        this.bet = res.bet;
        this.balance = res.balance;
      });
  }

  private subscribeToSpinDisabled() {
    this.store.select(selectSpinDisabled)
      .pipe(takeUntil(this.spinDisabledDestroyed$))
      .subscribe((spinDis) => {
        this.betDisabled = spinDis;
      });
  }

  setBet(value: number): void {
    this.store.dispatch(new SetBet(this.bet + value));
  }

}
