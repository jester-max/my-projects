import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePanelPage } from './home-panel.page';

describe('HomePanelPage', () => {
  let component: HomePanelPage;
  let fixture: ComponentFixture<HomePanelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
