import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeDashboardComponent } from './custome-dashboard.component';

describe('CustomeDashboardComponent', () => {
  let component: CustomeDashboardComponent;
  let fixture: ComponentFixture<CustomeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
