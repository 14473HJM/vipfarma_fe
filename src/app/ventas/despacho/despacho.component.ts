import { Component, OnInit } from '@angular/core';
import { SaleOrder } from 'src/interfaces/sale-order';
import { SaleOrderService } from 'src/services/sale-order.service';

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css']
})
export class DespachoComponent implements OnInit {

  saleOrder = {} as SaleOrder[];
  selectedOrder = {} as SaleOrder;

  constructor(private saleOrderSrv : SaleOrderService) { }

  ngOnInit(): void {
			this.refresh();
  }

  refresh() {
    this.saleOrderSrv.getSaleOrdersBilled(1001).subscribe({
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

  despachar() {
    //this.billSrv.billOrder(this.selectedOrder.id).subscribe({
    //  next: () => {
    //    alert("Se facturo Orden N` " + this.selectedOrder.id);
    //    this.refresh();
    //  },
    //  error: () => {
    //    alert("Error en el Servicio");
    //  },
    //})
  }

}
