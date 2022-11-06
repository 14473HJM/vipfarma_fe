import { Component, OnInit } from '@angular/core';
import { LockerStockDTO } from 'src/dto/LockerStockDTO';
import { Locker } from 'src/interfaces/Locker';
import { LockerTransaction } from 'src/interfaces/LockerTransaction';
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
  storedStatus: string = "STORED"; 

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
    
    for(let it of order.stockOrderItems) {
      this.lockServ.getLockersAvailable(it.product.id, it.actualQuantity).subscribe({
        next: (response : Locker[]) => {
          it.lockersAvailables = response;
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
    this.getAllReceivedOrders();
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
  */

  setStatus(status: string) {
    this.selectedOrder.stockOrderStatus = status;
    for(let item of this.selectedOrder.stockOrderItems) {
      item.stockOrderItemStatus = status;
    }
  }

  guardarOrden() {
    
    if(!this.checkUbicaciones()) {
      return;
    }
    this.setStatus(this.storedStatus);

    Swal.fire({
      title: 'Esta seguro de marcar la Orden ' + this.selectedOrder.id + ' como ALMACENADA ??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Almacenar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        alert("A GUARDAAAAAAAR !!!!!");
        alert(this.selectedOrder.toString())
        /*
        this.orderStServ.putStatusOrderStock("STORED", this.selectedOrder).subscribe({
          next: () => {
            Swal.fire({
              title: 'Orden ' + this.selectedOrder.id + ' marcada como ALMACENADA',
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
        */
      }
    });
  }

  checkUbicaciones(): boolean {
    for(let item of this.selectedOrder.stockOrderItems) {

      var lockerTrans = {} as LockerTransaction;
      var lockerSel = document.getElementById(item.id.toString()) as HTMLSelectElement | null;
      if (lockerSel != null) {
        const value = lockerSel.value;
        if(item.actualQuantity > 0 && (value == null || value == "")) {
          Swal.fire({
            title: 'Debe Seleccionar Locker para almacenar el producto ' + item.product.name,
            icon: 'error',
            confirmButtonText: "Ok",
          });
          return false;
        } 
        lockerTrans.lockerId = Number(value);
        lockerTrans.quantity = item.actualQuantity;
      }
      item.lockerTransaction = lockerTrans;
    }
    return true;
  }
  
}
