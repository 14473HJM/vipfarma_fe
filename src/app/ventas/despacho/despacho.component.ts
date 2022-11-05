import { Component, OnInit } from '@angular/core';
import { SaleOrder } from 'src/interfaces/sale-order';
import { SaleOrderService } from 'src/services/sale-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css']
})
export class DespachoComponent implements OnInit {

  saleOrder = {} as SaleOrder[];
  selectedOrder = {} as SaleOrder;
  orderDetail = {} as SaleOrder;

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
        Swal.fire({
          title: 'Error en el servicio',
          icon: 'error',
          confirmButtonText: "Ok",
        });
      },
    })
  }

  onSelectionChange(order: SaleOrder) {
    this.selectedOrder = order;

    this.saleOrderSrv.getOrderById(this.selectedOrder.id).subscribe({
      next: (response : SaleOrder) => {
        this.orderDetail = response;
      },
      error: () => {
        Swal.fire({
          title: 'Error en el servicio',
          icon: 'error',
          confirmButtonText: "Ok",
        });
      },
    })
  }

  despachar() {
    this.saleOrderSrv.changeStatus(this.selectedOrder.id, "DELIVERED").subscribe({
      next: (response : SaleOrder) => {
        alert("Orden No " + this.selectedOrder.id + " se despacho correctamente !")
        this.refresh();
        this.selectedOrder = {} as SaleOrder;
      },
      error: () => {
        Swal.fire({
          title: 'Error en el servicio',
          icon: 'error',
          confirmButtonText: "Ok",
        });
      },
    })
  }

}
