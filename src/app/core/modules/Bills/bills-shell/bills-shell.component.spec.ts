import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsShellComponent } from './bills-shell.component';

describe('BillsShellComponent', () => {
  let component: BillsShellComponent;
  let fixture: ComponentFixture<BillsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillsShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
