import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMainDataFormComponent } from './products-main-data-form.component';

describe('ProductsMainDataFormComponent', () => {
  let component: ProductsMainDataFormComponent;
  let fixture: ComponentFixture<ProductsMainDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsMainDataFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsMainDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
