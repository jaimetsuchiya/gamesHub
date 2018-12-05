import { TestBed } from '@angular/core/testing';

import { GorillaService } from './gorilla.service';

describe('GorillaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GorillaService = TestBed.get(GorillaService);
    expect(service).toBeTruthy();
  });
});
