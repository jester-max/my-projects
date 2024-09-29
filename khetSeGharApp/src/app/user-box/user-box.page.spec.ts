import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBoxPage } from './user-box.page';

describe('UserBoxPage', () => {
  let component: UserBoxPage;
  let fixture: ComponentFixture<UserBoxPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
