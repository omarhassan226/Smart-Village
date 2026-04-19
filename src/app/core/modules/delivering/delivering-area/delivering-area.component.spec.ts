import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveringAreaComponent } from './delivering-area.component';

describe('DeliveringAreaComponent', () => {
  let component: DeliveringAreaComponent;
  let fixture: ComponentFixture<DeliveringAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveringAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveringAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
