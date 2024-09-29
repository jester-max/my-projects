import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationModulesComponent } from './configuration-modules.component';

describe('ConfigurationModulesComponent', () => {
  let component: ConfigurationModulesComponent;
  let fixture: ComponentFixture<ConfigurationModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationModulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
