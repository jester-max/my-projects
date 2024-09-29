import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseQuotationComponent } from './purchase-quotation.component';

describe('PurchaseQuotationComponent', () => {
  let component: PurchaseQuotationComponent;
  let fixture: ComponentFixture<PurchaseQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseQuotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
