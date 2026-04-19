import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveringselectTabShellComponent } from './deliveringselect-tab-shell.component';

describe('DeliveringselectTabShellComponent', () => {
  let component: DeliveringselectTabShellComponent;
  let fixture: ComponentFixture<DeliveringselectTabShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveringselectTabShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveringselectTabShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
