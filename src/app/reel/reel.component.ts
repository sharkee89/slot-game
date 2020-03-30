import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter, QueryList, ViewChildren } from '@angular/core';
import { CONSTANTS } from '../config/constants';
import { ReplaySubject } from 'rxjs';
import { IAppState } from '../store/state/app.state';
import { Store } from '@ngrx/store';
import { SetResult } from '../store/actions/game.actions';

@Component({
  selector: 'app-reel',
  templateUrl: './reel.component.html',
  styleUrls: ['./reel.component.scss']
})
export class ReelComponent implements OnInit {
  @ViewChild('reelContainer', null) reelContainer: ElementRef;
  @ViewChildren('symbolComp') symbolComp: QueryList<ElementRef>;

  symbolsNumber: number = CONSTANTS.SYMBOLS;
  symbols = '';
  reelConfiguration = [];
  showReelContainer = false;
  spinDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  startIndex;

  constructor(
    private store: Store<IAppState>,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.initSymbols();
    this.initReelConfiguration(this.symbols);
  }

  onSpin() {
  }

  highlightAtIndex(combination, validity) {
    this.symbolComp.forEach((symbol, index) => {
      if ((this.startIndex + combination[1]) === index) {
        this.renderer.setStyle(symbol.nativeElement, 'background-color', validity ? 'rgba(0, 255, 125)' : 'transparent');
      }
    });
  }

  private initSymbols() {
    let result = '';
    for (let i = 0; i < CONSTANTS.SYMBOLS_LENGTH; i++) {
      const choice = Math.floor(Math.random() * 6) + 1;
      const symbol = CONSTANTS.CHARACTERS[choice];
      result = result + symbol;
    }
    this.symbols = result;
  }

  private initReelConfiguration(symbols) {
    for (let i = 0; i < symbols.length; i++) {
      switch(symbols.charAt(i)) {
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

  spin(idx: number) {
    // this.initSymbols();
    // this.initReelConfiguration(this.symbols);
    this.startSpinning(idx);
  }

  private startSpinning(idx: number) {
    // this.renderer.setStyle(this.reelContainer.nativeElement, 'opacity', '1');
    const choice = Math.floor(Math.random() * 6) + 1;
    const result = 6 + 4 * choice;
    let goal = -6;
    let value = 1;
    const inter = setInterval(() => {
      goal = goal - value;
      if (Math.abs(goal) >= result) {
        clearInterval(inter);
        // this.renderer.setStyle(this.reelContainer.nativeElement, 'opacity', '0.5');
        let counter = (Math.abs(goal) - 6) / 4;
        this.startIndex = (Math.abs(goal) - 6) / 4;;
        const results = [];
        for (let i = 0; i < 3; i++) {
          results.push(this.getResultSymbol(this.reelConfiguration[counter]));
          counter++;
        }
        this.store.dispatch(new SetResult({result: results, index: idx}));
      }
      this.renderer.setStyle(this.reelContainer.nativeElement, 'transform', 'translate(-50%, ' + goal + '%)');
    }, 10);
  }

  private getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  private getResultSymbol(result) {
    switch(result.image) {
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
