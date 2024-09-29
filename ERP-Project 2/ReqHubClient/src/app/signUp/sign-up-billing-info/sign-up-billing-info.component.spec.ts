import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpBillingInfoComponent } from './sign-up-billing-info.component';

describe('SignUpBillingInfoComponent', () => {
  let component: SignUpBillingInfoComponent;
  let fixture: ComponentFixture<SignUpBillingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpBillingInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpBillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
