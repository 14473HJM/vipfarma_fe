import { TestBed } from '@angular/core/testing';

import { BranchOfficeService } from './branch-office.service';

describe('BranchOfficeService', () => {
  let service: BranchOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
