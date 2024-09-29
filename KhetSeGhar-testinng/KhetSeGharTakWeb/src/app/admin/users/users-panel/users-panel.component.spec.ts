import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPanelComponent } from './users-panel.component';

describe('UsersPanelComponent', () => {
  let component: UsersPanelComponent;
  let fixture: ComponentFixture<UsersPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersPanelComponent]
    });
    fixture = TestBed.createComponent(UsersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
