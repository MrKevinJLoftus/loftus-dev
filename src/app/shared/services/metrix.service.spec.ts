import { TestBed } from '@angular/core/testing';

import { MetrixService } from './metrix.service';

describe('MetrixService', () => {
  let service: MetrixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetrixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
