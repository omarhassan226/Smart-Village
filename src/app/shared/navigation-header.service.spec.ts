import { TestBed } from '@angular/core/testing';

import { NavigationHeaderService } from './navigation-header.service';

describe('NavigationHeaderService', () => {
  let service: NavigationHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
