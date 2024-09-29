import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigModuleComponent } from './config-module.component';

describe('ConfigModuleComponent', () => {
  let component: ConfigModuleComponent;
  let fixture: ComponentFixture<ConfigModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
