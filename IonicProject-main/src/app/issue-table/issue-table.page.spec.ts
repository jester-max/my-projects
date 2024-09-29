import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueTablePage } from './issue-table.page';

describe('IssueTablePage', () => {
  let component: IssueTablePage;
  let fixture: ComponentFixture<IssueTablePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IssueTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
