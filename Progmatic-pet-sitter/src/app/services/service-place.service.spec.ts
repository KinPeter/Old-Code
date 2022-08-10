import { TestBed } from '@angular/core/testing';

import { ServicePlaceService } from './service-place.service';

describe('ServicePlaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePlaceService = TestBed.get(ServicePlaceService);
    expect(service).toBeTruthy();
  });
});
