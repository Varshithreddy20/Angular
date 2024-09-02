import { TestBed } from '@angular/core/testing';

import { AsyncValidationService } from './async-validation.service';

describe('AsyncValidationService', () => {
  let service: AsyncValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
