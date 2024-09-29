import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetVendorsPaymentsPage } from './get-vendors-payments.page';

describe('GetVendorsPaymentsPage', () => {
  let component: GetVendorsPaymentsPage;
  let fixture: ComponentFixture<GetVendorsPaymentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetVendorsPaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
