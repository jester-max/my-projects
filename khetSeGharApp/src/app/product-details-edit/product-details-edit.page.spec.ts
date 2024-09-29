import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsEditPage } from './product-details-edit.page';

describe('ProductDetailsEditPage', () => {
  let component: ProductDetailsEditPage;
  let fixture: ComponentFixture<ProductDetailsEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
