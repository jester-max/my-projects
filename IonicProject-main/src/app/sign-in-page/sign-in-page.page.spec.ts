import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInPagePage } from './sign-in-page.page';

describe('SignInPagePage', () => {
  let component: SignInPagePage;
  let fixture: ComponentFixture<SignInPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignInPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
