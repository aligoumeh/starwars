import { TestBed } from '@angular/core/testing';

import { SepeciesResolverService } from './sepecies-resolver.service';

describe('SepeciesResolverService', () => {
  let service: SepeciesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SepeciesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
