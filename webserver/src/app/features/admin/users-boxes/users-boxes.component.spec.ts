import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBoxesComponent } from './users-boxes.component';

describe('UsersBoxesComponent', () => {
  let component: UsersBoxesComponent;
  let fixture: ComponentFixture<UsersBoxesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersBoxesComponent]
    });
    fixture = TestBed.createComponent(UsersBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
