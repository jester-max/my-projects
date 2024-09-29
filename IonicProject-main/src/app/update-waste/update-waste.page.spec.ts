import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateWastePage } from './update-waste.page';

describe('UpdateWastePage', () => {
  let component: UpdateWastePage;
  let fixture: ComponentFixture<UpdateWastePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateWastePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
