import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactInfoShellComponent } from './contact-info-shell.component';

describe('ContactInfoShellComponent', () => {
  let component: ContactInfoShellComponent;
  let fixture: ComponentFixture<ContactInfoShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInfoShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
