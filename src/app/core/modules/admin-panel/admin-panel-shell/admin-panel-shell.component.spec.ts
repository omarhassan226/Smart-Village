import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelShellComponent } from './admin-panel-shell.component';

describe('AdminPanelShellComponent', () => {
  let component: AdminPanelShellComponent;
  let fixture: ComponentFixture<AdminPanelShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPanelShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
