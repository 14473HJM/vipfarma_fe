import { TestBed } from '@angular/core/testing';

import { OrderStockService } from './order-stock.service';

describe('OrderStockService', () => {
  let service: OrderStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
