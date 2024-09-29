import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetOneIssuePage } from './get-one-issue.page';

describe('GetOneIssuePage', () => {
  let component: GetOneIssuePage;
  let fixture: ComponentFixture<GetOneIssuePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetOneIssuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
