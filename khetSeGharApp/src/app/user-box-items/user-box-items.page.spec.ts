import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBoxItemsPage } from './user-box-items.page';

describe('UserBoxItemsPage', () => {
  let component: UserBoxItemsPage;
  let fixture: ComponentFixture<UserBoxItemsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBoxItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
