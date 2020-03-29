import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReelSetComponent } from './reel-set.component';

describe('ReelSetComponent', () => {
  let component: ReelSetComponent;
  let fixture: ComponentFixture<ReelSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReelSetComponent ]
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
