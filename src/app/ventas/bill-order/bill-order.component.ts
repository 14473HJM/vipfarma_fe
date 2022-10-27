import { Component, OnInit } from '@angular/core';
import { SaleOrder } from 'src/interfaces/sale-order';
import { BillingService } from 'src/services/billing.service';
import { SaleOrderService } from 'src/services/sale-order.service';

@Component({
  selector: 'app-bill-order',
  templateUrl: './bill-order.component.html',
  styleUrls: ['./bill-order.component.css']
})
export class BillOrderComponent implements OnInit {

  saleOrder = {} as SaleOrder[];
  selectedOrder = {} as SaleOrder;

  constructor(private saleOrderSrv : SaleOrderService, 
    private billSrv : BillingService) { }

  ngOnInit(): void {
			this.refresh();
  }

  refresh() {
    this.saleOrderSrv.getSaleOrdersReadyToBill(1001).subscribe({
      next: (response : SaleOrder[]) => {
        this.saleOrder = response;
      },
      error: () => {
        alert("Error en el Servicio");
      },
    })
  }

  onSelectionChange(order: SaleOrder) {
    this.selectedOrder = order;
}

  facturar() {
    this.billSrv.billOrder(this.selectedOrder.id).subscribe({
      next: () => {
        alert("Se facturo Orden N` " + this.selectedOrder.id);
        this.refresh();
      },
      error: () => {
        alert("Error en el Servicio");
      },
    })
  }

}
