import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsTabShellComponent } from './products-tab-shell.component';

describe('ProductsTabShellComponent', () => {
  let component: ProductsTabShellComponent;
  let fixture: ComponentFixture<ProductsTabShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsTabShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsTabShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
