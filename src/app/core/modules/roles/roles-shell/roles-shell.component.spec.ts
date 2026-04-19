import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesShellComponent } from './roles-shell.component';

describe('RolesShellComponent', () => {
  let component: RolesShellComponent;
  let fixture: ComponentFixture<RolesShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
