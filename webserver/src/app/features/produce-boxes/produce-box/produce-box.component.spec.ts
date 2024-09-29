import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceBoxComponent } from './produce-box.component';

describe('ProduceBoxComponent', () => {
  let component: ProduceBoxComponent;
  let fixture: ComponentFixture<ProduceBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProduceBoxComponent]
    });
    fixture = TestBed.createComponent(ProduceBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
