import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayComponent } from '../play/play.component';
import { IAppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { selectGameObject } from '../store/selectors/game.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @ViewChild(PlayComponent, null) playComponent: PlayComponent;

  constructor(
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.store.select(selectGameObject)
      .pipe(take(1))
      .subscribe((e) => {
        console.log(e);
      });
  }

  onSpin() {
    this.playComponent.onSpin();
  }

}
