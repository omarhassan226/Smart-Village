import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPopComponent } from './setting-pop.component';

describe('SettingPopComponent', () => {
  let component: SettingPopComponent;
  let fixture: ComponentFixture<SettingPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
