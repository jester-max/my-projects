import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInRootUserComponent } from './sign-in-root-user.component';

describe('SignInRootUserComponent', () => {
  let component: SignInRootUserComponent;
  let fixture: ComponentFixture<SignInRootUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInRootUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInRootUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
