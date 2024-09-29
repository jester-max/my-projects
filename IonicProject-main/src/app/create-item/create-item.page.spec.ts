import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateItemPage } from './create-item.page';

describe('CreateItemPage', () => {
  let component: CreateItemPage;
  let fixture: ComponentFixture<CreateItemPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
