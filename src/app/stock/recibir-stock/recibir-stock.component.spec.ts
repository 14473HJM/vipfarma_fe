import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirStockComponent } from './recibir-stock.component';

describe('RecibirStockComponent', () => {
  let component: RecibirStockComponent;
  let fixture: ComponentFixture<RecibirStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecibirStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecibirStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
