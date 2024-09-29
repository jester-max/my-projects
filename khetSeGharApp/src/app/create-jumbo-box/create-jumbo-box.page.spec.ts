import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateJumboBoxPage } from './create-jumbo-box.page';

describe('CreateJumboBoxPage', () => {
  let component: CreateJumboBoxPage;
  let fixture: ComponentFixture<CreateJumboBoxPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJumboBoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
