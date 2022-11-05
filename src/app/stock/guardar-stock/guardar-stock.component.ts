import { Component, OnInit } from '@angular/core';
import { LockerStockDTO } from 'src/dto/LockerStockDTO';
import { Locker } from 'src/interfaces/Locker';
import { StockOrder } from 'src/interfaces/StockOrder';
import { StockOrderItem } from 'src/interfaces/StockOrderItem';
import { LockerService } from 'src/services/locker.service';
import { OrderStockService } from 'src/services/order-stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guardar-stock',
  templateUrl: './guardar-stock.component.html',
  styleUrls: ['./guardar-stock.component.css']
})
export class GuardarStockComponent implements OnInit {

  stockOrders = {} as StockOrder[];
  selectedOrder = {} as StockOrder;
  itemToSave = {} as StockOrderItem;
  filterOrderStock: string = "";
  actualLockers = {} as Locker[];
  lockerSelected = {} as Locker;
  lockerStocks: LockerStockDTO[];
  public page: number;

  constructor(private orderStServ: OrderStockService, private lockServ: LockerService) {
    this.lockerStocks = [ {locker: this.lockerSelected, quantity: 0} ];
   }

  ngOnInit(): void {
    this.getAllReceivedOrders();
  }

  getAllReceivedOrders() {
    this.orderStServ.getSaleOrderReceived().subscribe({
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

  actualizarUbicacion(item: StockOrderItem) {
    this.itemToSave = item;
    

    this.lockServ.getLockersAvailable(item.product.id, item.actualQuantity).subscribe({
      next: (response : Locker[]) => {
        this.actualLockers = response;
        let stLoc = {} as LockerStockDTO;
        stLoc.locker = this.actualLockers[0];
        stLoc.quantity = 0;
        this.lockerStocks.push(stLoc);
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

  agregarLockers() {
    let stLoc = {} as LockerStockDTO;
    stLoc.locker = this.actualLockers[0];
    stLoc.quantity = 0;
    this.lockerStocks.push(stLoc);
  }

  cancelar() {
    this.selectedOrder = {} as StockOrder;
  }

  /*
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

    item.actualQuantity = item.receivedQuantity - item.rejectedQuantity;
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
            this.getAllReceivedOrders();
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
*/

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

      //this.calcularStatus(item);
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
            this.getAllReceivedOrders();
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

  
}
