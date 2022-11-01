import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmOrderComponent } from './abm-order.component';

describe('AbmOrderComponent', () => {
  let component: AbmOrderComponent;
  let fixture: ComponentFixture<AbmOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
