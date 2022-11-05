import { Component, OnInit } from '@angular/core';
import { StockOrder } from 'src/interfaces/StockOrder';
import { StockOrderItem } from 'src/interfaces/StockOrderItem';
import { OrderStockService } from 'src/services/order-stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recibir-stock',
  templateUrl: './recibir-stock.component.html',
  styleUrls: ['./recibir-stock.component.css']
})
export class RecibirStockComponent implements OnInit {

  stockOrders = {} as StockOrder[];
  selectedOrder = {} as StockOrder;
  filterOrderStock: string = "";
  public page: number;

  constructor(private orderStServ: OrderStockService) { }

  ngOnInit(): void {
    this.getAllPendingOrders();
  }

  getAllPendingOrders() {
    this.orderStServ.getSaleOrderPendingDelivery().subscribe({
      next: (response : StockOrder[]) => {
        this.stockOrders = response;
      },
      error: () => {
        Swal.fire({
          title: 'Error en el Servicio',
          icon: 'error',
          confirmButtonText: "Ok",
        });
      },
    })
  }

  onSelectionChange(order: StockOrder) {
    this.selectedOrder = order;
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Seguro desea Cancelar la Orden ' + id + ' ??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.orderStServ.putStatusOrderStockCancelled(id, "CANCELED").subscribe({
          next: () => {
            Swal.fire({
              title: 'Orden ' + id + ' Cancelada',
              icon: 'info',
              confirmButtonText: "Ok",
            });
            this.getAllPendingOrders();
            this.selectedOrder = {} as StockOrder;
          },
          error: () => {
            Swal.fire({
              title: 'Error en el Servicio',
              icon: 'error',
              confirmButtonText: "Ok",
            });
          },
        })
      }
    });
  }

  change(item: StockOrderItem) {
    
    var inputRec = document.getElementById(item.id.toString()) as HTMLInputElement | null;
    var inputRej = document.getElementById(item.product.name) as HTMLInputElement | null;

    if (inputRec != null) {
      const value = inputRec.value;
      item.receivedQuantity = Number(value);
    }
    if (inputRej != null) {
      const value = inputRej.value;
      item.rejectedQuantity = Number(value);
    }

    let total = item.receivedQuantity - item.rejectedQuantity;
    if(total < 0) {
      total = 0;
    }
    item.actualQuantity = total;
  }

  reject(id : number) {
    Swal.fire({
      title: 'Seguro desea Devolver la Orden ' + id + ' ??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Devolver',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.orderStServ.putStatusOrderStock("REJECTED", this.selectedOrder).subscribe({
          next: () => {
            Swal.fire({
              title: 'Orden ' + id + ' marcada como DEVUELTA',
              icon: 'info',
              confirmButtonText: "Ok",
            });
            this.getAllPendingOrders();
            this.selectedOrder = {} as StockOrder;
          },
          error: () => {
            Swal.fire({
              title: 'Error en el Servicio',
              icon: 'error',
              confirmButtonText: "Ok",
            });
          },
        })
      }
    });
  }

  guardarOrden() {

    for(let item of this.selectedOrder.stockOrderItems) {
      if(item.receivedQuantity == null || item.rejectedQuantity == null || item.actualQuantity == null) {
        Swal.fire({
              title: 'Debe ingresar todos los campos',
              icon: 'error',
              confirmButtonText: "Ok",
            });
            return;
      }

      this.calcularStatus(item);
    }

    Swal.fire({
      title: 'Esta seguro de Registrar la Orden ' + this.selectedOrder.id + ' ??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Registrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.orderStServ.putStatusOrderStock("RECEIVED", this.selectedOrder).subscribe({
          next: () => {
            Swal.fire({
              title: 'Orden ' + this.selectedOrder.id + ' marcada como RECIBIDA',
              icon: 'info',
              confirmButtonText: "Ok",
            });
            this.getAllPendingOrders();
            this.selectedOrder = {} as StockOrder;
          },
          error: () => {
            Swal.fire({
              title: 'Error en el Servicio',
              icon: 'error',
              confirmButtonText: "Ok",
            });
          },
        })
      }
    });
  }

  calcularStatus(item: StockOrderItem) {
    if(item.actualQuantity >= item.requiredQuantity) {
      item.stockOrderItemStatus = "COMPLETELY_RECEIVED";
    } else if (item.actualQuantity > 0 && item.actualQuantity < item.requiredQuantity) {
      item.stockOrderItemStatus = "PARTIALLY_RECEIVED";
    } else if (item.actualQuantity == 0) {
      item.stockOrderItemStatus = "NO_RECEIVED";
    }
  }

}
