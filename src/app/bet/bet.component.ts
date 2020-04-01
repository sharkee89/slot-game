import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/state/app.state';
import { SetBet } from '../store/actions/money.actions';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectBet } from '../store/selectors/money.selectors';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.scss']
})
export class BetComponent implements OnInit, OnDestroy {

  bet: number;
  betDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.subscribeToBet();
  }

  ngOnDestroy() {
    this.betDestroyed$.next(true);
    this.betDestroyed$.complete();
  }

  subscribeToBet(): void {
    this.store.select(selectBet)
      .pipe(takeUntil(this.betDestroyed$))
      .subscribe((bet) => {
        this.bet = bet;
      });
  }

  setBet(value: number): void {
    this.store.dispatch(new SetBet(this.bet + value));
  }

}
