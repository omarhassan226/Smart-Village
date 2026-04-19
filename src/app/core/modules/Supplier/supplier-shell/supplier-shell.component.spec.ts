import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierShellComponent } from './supplier-shell.component';

describe('SupplierShellComponent', () => {
  let component: SupplierShellComponent;
  let fixture: ComponentFixture<SupplierShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
