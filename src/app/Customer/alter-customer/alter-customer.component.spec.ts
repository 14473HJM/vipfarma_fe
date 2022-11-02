import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterCustomerComponent } from './alter-customer.component';

describe('AlterCustomerComponent', () => {
  let component: AlterCustomerComponent;
  let fixture: ComponentFixture<AlterCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
