import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavPage } from './sidenav.page';

describe('SidenavPage', () => {
  let component: SidenavPage;
  let fixture: ComponentFixture<SidenavPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SidenavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
