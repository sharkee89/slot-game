import { Component, OnInit, ViewChild, ElementRef, Renderer2, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { CONSTANTS } from '../config/constants';
import { playAudio } from '../helpers/general.helper';
import { SetResult } from '../store/actions/game.actions';
import { IAppState } from '../store/state/app.state';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-reel',
  templateUrl: './reel.component.html',
  styleUrls: ['./reel.component.scss']
})
export class ReelComponent implements OnInit {
  @ViewChild('reelContainer', null) reelContainer: ElementRef;
  @ViewChildren('symbolComp') symbolComp: QueryList<ElementRef>;
  symbolsNumber: number = CONSTANTS.SYMBOLS;
  startIndex;
  symbols = '';
  showReelContainer = false;
  reelConfiguration = [];
  spinDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  audio = new Audio();

  constructor(
    private store: Store<IAppState>,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.initSymbols();
    this.initReelConfiguration(this.symbols);
  }

  highlightAtIndex(combination, validity): void {
    this.symbolComp.forEach((symbol, index) => {
      if ((this.startIndex + combination[1]) === index) {
        if (validity) {
          this.renderer.addClass(symbol.nativeElement, 'win');
        } else {
          this.renderer.removeClass(symbol.nativeElement, 'win');
        }
      }
    });
  }

  spin(idx: number): void {
    this.startSpinning(idx);
  }

  private initSymbols(): void {
    let result = '';
    for (let i = 0; i < CONSTANTS.SYMBOLS_LENGTH; i++) {
      const choice = Math.floor(Math.random() * 6) + 1;
      const symbol = CONSTANTS.CHARACTERS[choice];
      result = result + symbol;
    }
    this.symbols = result;
  }

  private initReelConfiguration(symbols): void {
    for (let i = 0; i < symbols.length; i++) {
      switch (symbols.charAt(i)) {
        case 'A':
          this.reelConfiguration.unshift({image: 'card'});
          break;
        case 'B':
          this.reelConfiguration.unshift({image: 'bonus'});
          break;
        case 'C':
          this.reelConfiguration.unshift({image: 'cherry'});
          break;
        case 'F':
          this.reelConfiguration.unshift({image: 'fire'});
          break;
        case 'G':
          this.reelConfiguration.unshift({image: 'game'});
          break;
        case 'P':
          this.reelConfiguration.unshift({image: 'pizza'});
          break;
        case 'S':
            this.reelConfiguration.unshift({image: 'star'});
            break;
      }
    }
  }

  private startSpinning(idx: number): void {
    const choice = Math.floor(Math.random() * 6) + 1;
    const result = 6 + 4 * choice;
    let counter = -6;
    const inter = setInterval(() => {
      if (counter === -94) {
        counter = -6;
      }
      this.renderer.setStyle(this.reelContainer.nativeElement, 'transform', 'translate(-50%, ' + counter + '%)');
      counter--;
    }, 5);
    setTimeout(() => {
      this.afterRolling(idx, inter, result);
    }, (idx * 250) + 1250);
  }

  private afterRolling(idx, inter, result): void {
    playAudio('assets/sounds/check.wav', this.audio);
    clearInterval(inter);
    this.renderer.setStyle(this.reelContainer.nativeElement, 'transform', 'translate(-50%, -' + result + '%)');
    let c = (Math.abs(result) - 6) / 4;
    this.startIndex = (Math.abs(result) - 6) / 4;
    const results = [];
    for (let i = 0; i < 3; i++) {
      results.push(this.getResultSymbol(this.reelConfiguration[c]));
      c++;
    }
    this.store.dispatch(new SetResult({result: results, index: idx}));
  }

  private getResultSymbol(result): string {
    switch (result.image) {
      case 'card':
        return 'A';
      case 'bonus':
        return 'B';
      case 'cherry':
        return 'C';
      case 'fire':
        return 'F';
      case 'game':
        return 'G';
      case 'pizza':
        return 'P';
      case 'star':
        return 'S';
    }
  }

}
