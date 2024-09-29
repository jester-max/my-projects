import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTimePage } from './create-time.page';

describe('CreateTimePage', () => {
  let component: CreateTimePage;
  let fixture: ComponentFixture<CreateTimePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CreateTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
