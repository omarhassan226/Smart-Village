import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyShellComponent } from './policy-shell.component';

describe('PolicyShellComponent', () => {
  let component: PolicyShellComponent;
  let fixture: ComponentFixture<PolicyShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
