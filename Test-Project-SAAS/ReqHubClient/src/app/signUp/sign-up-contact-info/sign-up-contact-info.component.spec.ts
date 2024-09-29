import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpContactInfoComponent } from './sign-up-contact-info.component';

describe('SignUpContactInfoComponent', () => {
  let component: SignUpContactInfoComponent;
  let fixture: ComponentFixture<SignUpContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpContactInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
