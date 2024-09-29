import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetItemPage } from './get-item.page';

describe('GetItemPage', () => {
  let component: GetItemPage;
  let fixture: ComponentFixture<GetItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
