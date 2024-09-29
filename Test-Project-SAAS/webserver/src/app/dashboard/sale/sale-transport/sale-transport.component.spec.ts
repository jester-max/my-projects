import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTransportComponent } from './sale-transport.component';

describe('SaleTransportComponent', () => {
  let component: SaleTransportComponent;
  let fixture: ComponentFixture<SaleTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
