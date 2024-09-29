import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckLocationComponent } from './check-location.component';

describe('CheckLocationComponent', () => {
  let component: CheckLocationComponent;
  let fixture: ComponentFixture<CheckLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckLocationComponent]
    });
    fixture = TestBed.createComponent(CheckLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
