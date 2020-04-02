import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
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
});
