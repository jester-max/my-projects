import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetMistakePage } from './get-mistake.page';

describe('GetMistakePage', () => {
  let component: GetMistakePage;
  let fixture: ComponentFixture<GetMistakePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetMistakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
