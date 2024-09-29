import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetPaymentsPage } from './get-payments.page';

describe('GetPaymentsPage', () => {
  let component: GetPaymentsPage;
  let fixture: ComponentFixture<GetPaymentsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetPaymentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
