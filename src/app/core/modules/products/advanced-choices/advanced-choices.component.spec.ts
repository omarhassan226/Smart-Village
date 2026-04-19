import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedChoicesComponent } from './advanced-choices.component';

describe('AdvancedChoicesComponent', () => {
  let component: AdvancedChoicesComponent;
  let fixture: ComponentFixture<AdvancedChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvancedChoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
