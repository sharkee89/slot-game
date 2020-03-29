import { Component, OnInit, ViewChild } from '@angular/core';
import { ReelSetComponent } from '../reel-set/reel-set.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  @ViewChild(ReelSetComponent, null) reelSetComponent: ReelSetComponent;

  constructor() { }

  ngOnInit() {
  }

  onSpin() {
    this.reelSetComponent.onSpin();
  }

}
