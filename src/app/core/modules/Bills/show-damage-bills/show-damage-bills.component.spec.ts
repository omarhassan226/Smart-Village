import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDamageBillsComponent } from './show-damage-bills.component';

describe('ShowDamageBillsComponent', () => {
  let component: ShowDamageBillsComponent;
  let fixture: ComponentFixture<ShowDamageBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDamageBillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDamageBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
