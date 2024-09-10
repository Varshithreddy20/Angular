import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { formDeactivateGuard } from './form-deactivate.guard';

describe('formDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formDeactivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
