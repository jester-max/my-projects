import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetToolsPage } from './get-tools.page';

describe('GetToolsPage', () => {
  let component: GetToolsPage;
  let fixture: ComponentFixture<GetToolsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetToolsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
