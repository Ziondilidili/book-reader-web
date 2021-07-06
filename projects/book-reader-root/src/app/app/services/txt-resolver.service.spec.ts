import { TestBed } from '@angular/core/testing';

import { TxtResolverService } from './txt-resolver.service';

describe('TxtResolverService', () => {
  let service: TxtResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TxtResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
