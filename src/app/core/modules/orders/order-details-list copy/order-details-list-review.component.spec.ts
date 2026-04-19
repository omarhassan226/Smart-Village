import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsListReviewComponent } from './order-details-list-review.component';

describe('OrderDetailsListReviewComponent', () => {
  let component: OrderDetailsListReviewComponent;
  let fixture: ComponentFixture<OrderDetailsListReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsListReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsListReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
