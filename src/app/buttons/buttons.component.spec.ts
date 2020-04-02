import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsComponent } from './buttons.component';
import { BetComponent } from '../bet/bet.component';
import { BalanceComponent } from '../balance/balance.component';
import { WinComponent } from '../win/win.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../store/reducers/app.reducers';

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
});
