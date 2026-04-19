import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerShellComponent } from './seller-shell.component';

describe('SellerShellComponent', () => {
  let component: SellerShellComponent;
  let fixture: ComponentFixture<SellerShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
