import { TestBed } from '@angular/core/testing';

import { PeopleResolverService } from './people-resolver.service';

describe('PeopleResolverService', () => {
  let service: PeopleResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
