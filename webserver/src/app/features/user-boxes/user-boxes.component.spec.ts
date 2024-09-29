import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBoxesComponent } from './user-boxes.component';

describe('UserBoxesComponent', () => {
  let component: UserBoxesComponent;
  let fixture: ComponentFixture<UserBoxesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserBoxesComponent]
    });
    fixture = TestBed.createComponent(UserBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
