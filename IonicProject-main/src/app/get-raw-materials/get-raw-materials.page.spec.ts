import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetRawMaterialsPage } from './get-raw-materials.page';

describe('GetRawMaterialsPage', () => {
  let component: GetRawMaterialsPage;
  let fixture: ComponentFixture<GetRawMaterialsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetRawMaterialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
