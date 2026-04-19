import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReturnBillsComponent } from './show-return-bills.component';

describe('ShowReturnBillsComponent', () => {
  let component: ShowReturnBillsComponent;
  let fixture: ComponentFixture<ShowReturnBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReturnBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReturnBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
