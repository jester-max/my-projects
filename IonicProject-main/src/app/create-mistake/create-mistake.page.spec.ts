import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMistakePage } from './create-mistake.page';

describe('CreateMistakePage', () => {
  let component: CreateMistakePage;
  let fixture: ComponentFixture<CreateMistakePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateMistakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
