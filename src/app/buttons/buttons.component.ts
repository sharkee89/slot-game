import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { SetSpinning, SetSpinDisabled } from '../store/actions/game.actions';
import { ReplaySubject } from 'rxjs';
import { selectSpinDisabled } from '../store/selectors/game.selectors';
import { takeUntil } from 'rxjs/operators';
import { playAudio } from '../helpers/general.helper';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit, OnDestroy {

  spinDisabled;
  spinDisabledDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  audio = new Audio();

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.subscribeToSpinDisabled();
  }

  ngOnDestroy() {
    this.spinDisabledDestroyed$.next(true);
    this.spinDisabledDestroyed$.complete();
  }

  handleSpin() {
    localStorage.setItem('name', 'Sladja');
    playAudio('assets/sounds/rolling.mp3', this.audio);
    this.store.dispatch(new SetSpinning(true));
    this.store.dispatch(new SetSpinning(false));
  }

  subscribeToSpinDisabled() {
    this.store.select(selectSpinDisabled)
      .pipe(takeUntil(this.spinDisabledDestroyed$))
      .subscribe((spinDis) => {
        this.spinDisabled = spinDis;
      });
  }

}
