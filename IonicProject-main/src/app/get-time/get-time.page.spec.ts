import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetTimePage } from './get-time.page';

describe('GetTimePage', () => {
  let component: GetTimePage;
  let fixture: ComponentFixture<GetTimePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
