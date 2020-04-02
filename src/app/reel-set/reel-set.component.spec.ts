import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ReelComponent } from '../reel/reel.component';
import { ReelSetComponent } from './reel-set.component';
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

  it('should ngOnInit correctly', () => {
    spyOn((component as any), 'subscribeToSpin');
    spyOn((component as any), 'subscribeToBet');
    component.ngOnInit();
    expect((component as any).subscribeToSpin).toHaveBeenCalled();
    expect((component as any).subscribeToBet).toHaveBeenCalled();
  });

  it('should ngOnDestroy correctly', () => {
    spyOn(component.spinDestroyed$, 'next');
    spyOn(component.spinDestroyed$, 'complete');
    spyOn(component.betDestroyed$, 'next');
    spyOn(component.betDestroyed$, 'complete');
    component.ngOnDestroy();
    expect(component.spinDestroyed$.next).toHaveBeenCalledWith(true);
    expect(component.spinDestroyed$.complete).toHaveBeenCalled();
    expect(component.betDestroyed$.next).toHaveBeenCalledWith(true);
    expect(component.betDestroyed$.complete).toHaveBeenCalled();
  });

  it('should evaluateResults correctly', () => {
    let spinResults = [['P', 'S', 'P'], ['C', 'P', 'C'], ['G', 'F', 'F'], ['S', 'P', 'G'], ['C', 'S', 'P']];
    (component as any).evaluateResults(spinResults);
    expect(component.winningLines).toEqual([]);
    expect(component.winningCombinations).toEqual([]);
    spinResults = [['P', 'F', 'B'], ['C', 'P', 'P'], ['P', 'C', 'C'], ['B', 'C', 'G'], ['S', 'G', 'F']];
    (component as any).evaluateResults(spinResults);
    expect(component.winningLines).toEqual([5, 8]);
    expect(component.winningCombinations).toEqual([
      [[0, 0], [1, 2], [2, 0], [3, 2], [4, 0]],
      [[0, 0], [1, 1], [2, 0], [3, 1], [4, 0]]
    ]);
  });

});
