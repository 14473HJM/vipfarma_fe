import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOrderComponent } from './bill-order.component';

describe('BillOrderComponent', () => {
  let component: BillOrderComponent;
  let fixture: ComponentFixture<BillOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
