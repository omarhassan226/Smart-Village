import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveringShellComponent } from './delivering-shell.component';

describe('DeliveringShellComponent', () => {
  let component: DeliveringShellComponent;
  let fixture: ComponentFixture<DeliveringShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveringShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveringShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
