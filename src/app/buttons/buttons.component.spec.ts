import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { BalanceComponent } from '../balance/balance.component';
import { BetComponent } from '../bet/bet.component';
import { ButtonsComponent } from './buttons.component';
import { appReducers } from '../store/reducers/app.reducers';
import { WinComponent } from '../win/win.component';
import { playAudio } from '../helpers/general.helper';
import { SetSpinning } from '../store/actions/game.actions';
import { StartBet } from '../store/actions/money.actions';

describe('ButtonsComponent', () => {
  let component: ButtonsComponent;
  let fixture: ComponentFixture<ButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ButtonsComponent,
        BetComponent,
        BalanceComponent,
        WinComponent
      ],
      imports: [
        StoreModule.forRoot(appReducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonsComponent);
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

  it('should handleSpin correctly', inject([Store], (store: Store<any>) => {
    spyOn(store, 'dispatch');
    component.handleSpin();
    expect(store.dispatch).toHaveBeenCalledWith(new SetSpinning(true));
    expect(store.dispatch).toHaveBeenCalledWith(new StartBet(component.bet));
    expect(store.dispatch).toHaveBeenCalledWith(new SetSpinning(false));
  }));

});
