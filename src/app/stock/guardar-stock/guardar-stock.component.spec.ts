import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarStockComponent } from './guardar-stock.component';

describe('GuardarStockComponent', () => {
  let component: GuardarStockComponent;
  let fixture: ComponentFixture<GuardarStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
