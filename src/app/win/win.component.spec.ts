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
});
