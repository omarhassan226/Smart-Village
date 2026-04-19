import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferSettingComponent } from './offer-setting.component';

describe('OfferSettingComponent', () => {
  let component: OfferSettingComponent;
  let fixture: ComponentFixture<OfferSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
