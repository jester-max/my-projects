import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateIssuePage } from './create-issue.page';

describe('CreateIssuePage', () => {
  let component: CreateIssuePage;
  let fixture: ComponentFixture<CreateIssuePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateIssuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
