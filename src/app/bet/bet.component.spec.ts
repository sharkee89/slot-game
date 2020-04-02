import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { BetComponent } from './bet.component';
import { SetBet } from '../store/actions/money.actions';
import { appReducers } from '../store/reducers/app.reducers';

describe('BetComponent', () => {
  let component: BetComponent;
  let fixture: ComponentFixture<BetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetComponent ],
      imports: [
        StoreModule.forRoot(appReducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit correctly', () => {
    spyOn((component as any), 'subscribeToBet');
    spyOn((component as any), 'subscribeToSpinDisabled');
    component.ngOnInit();
    expect((component as any).subscribeToBet).toHaveBeenCalled();
    expect((component as any).subscribeToSpinDisabled).toHaveBeenCalled();
  });

  it('should ngOnDestroy correctly', () => {
    spyOn(component.betDestroyed$, 'next');
    spyOn(component.betDestroyed$, 'complete');
    spyOn(component.spinDisabledDestroyed$, 'next');
    spyOn(component.spinDisabledDestroyed$, 'complete');
    component.ngOnDestroy();
    expect(component.betDestroyed$.next).toHaveBeenCalledWith(true);
    expect(component.betDestroyed$.complete).toHaveBeenCalled();
    expect(component.spinDisabledDestroyed$.next).toHaveBeenCalledWith(true);
    expect(component.spinDisabledDestroyed$.complete).toHaveBeenCalled();
  });

  it('should setBet correctly', inject([Store], (store: Store<any>) => {
    spyOn(store, 'dispatch');
    const value = 10;
    component.bet = 10;
    component.setBet(value);
    expect(store.dispatch).toHaveBeenCalledWith(new SetBet(component.bet + value));
  }));
});
