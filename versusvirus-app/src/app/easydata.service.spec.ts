import { TestBed } from '@angular/core/testing';

import { EasydataService } from './easydata.service';

describe('EasydataService', () => {
  let service: EasydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EasydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
