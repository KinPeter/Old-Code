import { TestBed } from '@angular/core/testing';

import { PettypeService } from './pettype.service';

describe('PettypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PettypeService = TestBed.get(PettypeService);
    expect(service).toBeTruthy();
  });
});
