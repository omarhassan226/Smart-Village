import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewOrderListComponent } from './review-order-list.component';

describe('ReviewOrderListComponent', () => {
  let component: ReviewOrderListComponent;
  let fixture: ComponentFixture<ReviewOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
