import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateBucketPage } from './create-bucket.page';

describe('CreateBucketPage', () => {
  let component: CreateBucketPage;
  let fixture: ComponentFixture<CreateBucketPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBucketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
