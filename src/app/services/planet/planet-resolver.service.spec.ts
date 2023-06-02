import { TestBed } from '@angular/core/testing';

import { PlanetResolverService } from './planet-resolver.service';

describe('PlanetResolverService', () => {
  let service: PlanetResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanetResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
