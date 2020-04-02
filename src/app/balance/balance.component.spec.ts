import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { BalanceComponent } from './balance.component';
import { appReducers } from '../store/reducers/app.reducers';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceComponent ],
      imports: [
        StoreModule.forRoot(appReducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit correctly', () => {
    spyOn((component as any), 'subscribeToBalance');
    component.ngOnInit();
    expect((component as any).subscribeToBalance).toHaveBeenCalled();
  });

  it('should ngOnDestroy correctly', () => {
    spyOn(component.balanceDestroyed$, 'next');
    spyOn(component.balanceDestroyed$, 'complete');
    component.ngOnDestroy();
    expect(component.balanceDestroyed$.next).toHaveBeenCalledWith(true);
    expect(component.balanceDestroyed$.complete).toHaveBeenCalled();
  });

});
