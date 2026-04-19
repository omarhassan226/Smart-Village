import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryMainDataFormComponent } from './delivery-main-data-form.component';

describe('DeliveryMainDataFormComponent', () => {
  let component: DeliveryMainDataFormComponent;
  let fixture: ComponentFixture<DeliveryMainDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryMainDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryMainDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
