import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressVerifyPage } from './address-verify.page';

describe('AddressVerifyPage', () => {
  let component: AddressVerifyPage;
  let fixture: ComponentFixture<AddressVerifyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
