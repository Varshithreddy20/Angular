import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { featureLoadGuard } from './feature-load.guard';

describe('featureLoadGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => featureLoadGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
