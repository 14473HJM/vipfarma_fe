import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPorProductoComponent } from './stock-por-producto.component';

describe('StockPorProductoComponent', () => {
  let component: StockPorProductoComponent;
  let fixture: ComponentFixture<StockPorProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockPorProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockPorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
