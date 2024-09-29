import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetWastePage } from './get-waste.page';

describe('GetWastePage', () => {
  let component: GetWastePage;
  let fixture: ComponentFixture<GetWastePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetWastePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
