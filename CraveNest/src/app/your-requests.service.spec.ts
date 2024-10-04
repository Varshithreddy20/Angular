import { TestBed } from '@angular/core/testing';

import { YourRequestsService } from './your-requests.service';

describe('YourRequestsService', () => {
  let service: YourRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
