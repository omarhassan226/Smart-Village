import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveringTabShellComponent } from './delivering-tab-shell.component';

describe('DeliveringTabShellComponent', () => {
  let component: DeliveringTabShellComponent;
  let fixture: ComponentFixture<DeliveringTabShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveringTabShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveringTabShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
