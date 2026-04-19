import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostsShellComponent } from './costs-shell.component';

describe('CostsShellComponent', () => {
  let component: CostsShellComponent;
  let fixture: ComponentFixture<CostsShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostsShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
