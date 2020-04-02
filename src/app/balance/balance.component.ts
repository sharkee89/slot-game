import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAppState } from '../store/state/app.state';
import { selectBalance } from '../store/selectors/money.selectors';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnDestroy {

  balance: number;
  balanceDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.subscribeToBalance();
  }

  ngOnDestroy() {
    this.balanceDestroyed$.next(true);
    this.balanceDestroyed$.complete();
  }

  private subscribeToBalance(): void {
    this.store.select(selectBalance)
      .pipe(takeUntil(this.balanceDestroyed$))
      .subscribe((balance) => {
        this.balance = balance;
      });
  }

}
