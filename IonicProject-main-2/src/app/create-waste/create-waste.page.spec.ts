import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateWastePage } from './create-waste.page';

describe('CreateWastePage', () => {
  let component: CreateWastePage;
  let fixture: ComponentFixture<CreateWastePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateWastePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
