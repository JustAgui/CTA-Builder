import { TestBed } from '@angular/core/testing';

import { CtabuilderService } from './ctabuilder.service';

describe('CtabuilderService', () => {
  let service: CtabuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CtabuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
