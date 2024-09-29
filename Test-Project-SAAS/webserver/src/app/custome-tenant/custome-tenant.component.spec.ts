import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeTenantComponent } from './custome-tenant.component';

describe('CustomeTenantComponent', () => {
  let component: CustomeTenantComponent;
  let fixture: ComponentFixture<CustomeTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeTenantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomeTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
