import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { ReelComponent } from './reel.component';
import { appReducers } from '../store/reducers/app.reducers';

describe('ReelComponent', () => {
  let component: ReelComponent;
  let fixture: ComponentFixture<ReelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReelComponent ],
      imports: [
        StoreModule.forRoot(appReducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit correctly', () => {
    spyOn((component as any), 'initSymbols');
    spyOn((component as any), 'initReelConfiguration');
    component.ngOnInit();
    expect((component as any).initSymbols).toHaveBeenCalled();
    expect((component as any).initReelConfiguration).toHaveBeenCalledWith(component.symbols);
  });

  it('should spin correctly', () => {
    spyOn((component as any), 'startSpinning');
    const id = 1;
    component.spin(id);
    expect((component as any).startSpinning).toHaveBeenCalledWith(id);
  });

  it('should initSymbols correctly', () => {
    (component as any).initSymbols();
    expect(component.symbols).toBeDefined();
    expect(component.symbols.length).toEqual(25);
  });

  it('should initReelConfiguration correctly', () => {
    (component as any).initReelConfiguration('ABCFGPS');
    expect(component.reelConfiguration[6]).toEqual({ image: 'card' });
    expect(component.reelConfiguration[5]).toEqual({ image: 'bonus' });
    expect(component.reelConfiguration[4]).toEqual({ image: 'cherry' });
    expect(component.reelConfiguration[3]).toEqual({ image: 'fire' });
    expect(component.reelConfiguration[2]).toEqual({ image: 'game' });
    expect(component.reelConfiguration[1]).toEqual({ image: 'pizza' });
    expect(component.reelConfiguration[0]).toEqual({ image: 'star' });
  });

  it('should afterRolling correctly', inject([Store], (store: Store<any>) => {
    spyOn(store, 'dispatch');
    (component as any).afterRolling(1, null, 18);
    expect(store.dispatch).toHaveBeenCalled();
  }));

  it('should getResultSymbol correctly', () => {
    expect((component as any).getResultSymbol({ image: 'card'})).toEqual('A');
    expect((component as any).getResultSymbol({ image: 'bonus'})).toEqual('B');
    expect((component as any).getResultSymbol({ image: 'cherry'})).toEqual('C');
    expect((component as any).getResultSymbol({ image: 'fire'})).toEqual('F');
    expect((component as any).getResultSymbol({ image: 'game'})).toEqual('G');
    expect((component as any).getResultSymbol({ image: 'pizza'})).toEqual('P');
    expect((component as any).getResultSymbol({ image: 'star'})).toEqual('S');
  });
});
