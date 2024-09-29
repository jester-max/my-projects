import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetOneItemPage } from './get-one-item.page';

describe('GetOneItemPage', () => {
  let component: GetOneItemPage;
  let fixture: ComponentFixture<GetOneItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetOneItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
