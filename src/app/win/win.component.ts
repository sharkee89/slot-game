import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectWin } from '../store/selectors/money.selectors';
import { IAppState } from '../store/state/app.state';

@Component({
  selector: 'app-win',
  templateUrl: './win.component.html',
  styleUrls: ['./win.component.scss']
})
export class WinComponent implements OnInit, OnDestroy {

  win: number;
  winDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private store: Store<IAppState>,
  ) { }

  ngOnInit() {
    this.subscribeToWin();
  }

  ngOnDestroy() {
    this.winDestroyed$.next(true);
    this.winDestroyed$.complete();
  }

  private subscribeToWin(): void {
    this.store.select(selectWin)
      .pipe(takeUntil(this.winDestroyed$))
      .subscribe((win) => {
        this.win = win;
      });
  }

}
