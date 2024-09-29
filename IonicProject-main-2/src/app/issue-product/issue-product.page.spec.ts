import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueProductPage } from './issue-product.page';

describe('IssueProductPage', () => {
  let component: IssueProductPage;
  let fixture: ComponentFixture<IssueProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IssueProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
