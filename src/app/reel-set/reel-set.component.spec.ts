import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelSetComponent } from './reel-set.component';
import { ReelComponent } from '../reel/reel.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../store/reducers/app.reducers';

describe('ReelSetComponent', () => {
  let component: ReelSetComponent;
  let fixture: ComponentFixture<ReelSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReelSetComponent,
        ReelComponent
      ],
      imports: [
        StoreModule.forRoot(appReducers)
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReelSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
