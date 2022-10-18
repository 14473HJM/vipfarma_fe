import { TestBed } from '@angular/core/testing';

import { HealthInsurancePlanService } from './health-insurance-plan.service';

describe('HealthInsurancePlanService', () => {
  let service: HealthInsurancePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthInsurancePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
