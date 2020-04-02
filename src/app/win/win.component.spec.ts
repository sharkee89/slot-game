import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../store/reducers/app.reducers';
import { WinComponent } from './win.component';

describe('WinComponent', () => {
  let component: WinComponent;
  let fixture: ComponentFixture<WinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinComponent ],
      imports: [
        StoreModule.forRoot(appReducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit correctly', () => {
    spyOn((component as any), 'subscribeToWin');
    component.ngOnInit();
    expect((component as any).subscribeToWin).toHaveBeenCalled();
  });

  it('should ngOnDestroy correctly', () => {
    spyOn(component.winDestroyed$, 'next');
    spyOn(component.winDestroyed$, 'complete');
    component.ngOnDestroy();
    expect(component.winDestroyed$.next).toHaveBeenCalledWith(true);
    expect(component.winDestroyed$.complete).toHaveBeenCalled();
  });
});
