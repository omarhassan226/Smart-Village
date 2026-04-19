import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersBascketComponent } from './orders-bascket.component';

describe('OrdersBascketComponent', () => {
  let component: OrdersBascketComponent;
  let fixture: ComponentFixture<OrdersBascketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersBascketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersBascketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
