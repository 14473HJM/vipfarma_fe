import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterProductComponent } from './alter-product.component';

describe('AlterProductComponent', () => {
  let component: AlterProductComponent;
  let fixture: ComponentFixture<AlterProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlterProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
