import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateMistakePage } from './update-mistake.page';

describe('UpdateMistakePage', () => {
  let component: UpdateMistakePage;
  let fixture: ComponentFixture<UpdateMistakePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateMistakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
