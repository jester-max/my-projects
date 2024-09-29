import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsIssuePage } from './details-issue.page';

describe('DetailsIssuePage', () => {
  let component: DetailsIssuePage;
  let fixture: ComponentFixture<DetailsIssuePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsIssuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
