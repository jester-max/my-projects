import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectBoxSizePage } from './select-box-size.page';

describe('SelectBoxSizePage', () => {
  let component: SelectBoxSizePage;
  let fixture: ComponentFixture<SelectBoxSizePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBoxSizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
