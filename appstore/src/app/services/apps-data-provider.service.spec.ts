import { TestBed } from '@angular/core/testing';

import { AppsDataProviderService } from './apps-data-provider.service';

describe('AppsDataProviderService', () => {
  let service: AppsDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppsDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
