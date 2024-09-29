import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAddressDetailsPage } from './user-address-details.page';

describe('UserAddressDetailsPage', () => {
  let component: UserAddressDetailsPage;
  let fixture: ComponentFixture<UserAddressDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAddressDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
