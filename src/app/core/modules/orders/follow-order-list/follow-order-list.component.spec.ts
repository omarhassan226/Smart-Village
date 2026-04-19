import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowOrderListComponent } from './follow-order-list.component';

describe('FollowOrderListComponent', () => {
  let component: FollowOrderListComponent;
  let fixture: ComponentFixture<FollowOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
