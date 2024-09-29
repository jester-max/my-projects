import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPlanComponentComponent } from './sub-plan-component.component';

describe('SubPlanComponentComponent', () => {
  let component: SubPlanComponentComponent;
  let fixture: ComponentFixture<SubPlanComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubPlanComponentComponent]
    });
    fixture = TestBed.createComponent(SubPlanComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
