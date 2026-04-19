import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsAddComponent } from './keywords-add.component';

describe('KeywordsAddComponent', () => {
  let component: KeywordsAddComponent;
  let fixture: ComponentFixture<KeywordsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
