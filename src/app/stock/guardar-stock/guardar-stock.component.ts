import { Component, OnInit } from '@angular/core';
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
  filterOrderStock: string = "";
  actualLockers = {} as Locker[];
  lockerSelected = {} as Locker;
  public page: number;
  storedStatus: string = "STORED"; 

  constructor(private orderStServ: OrderStockService, private lockServ: LockerService) { }

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

    this.lockServ.getLockersAvailable(item.product.id, item.actualQuantity).subscribe({
      next: (response : Locker[]) => {
        this.actualLockers = response;
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

  cancelar() {
    this.selectedOrder = {} as StockOrder;
    this.getAllReceivedOrders();
  }

  setStatus(status: string) {
    this.selectedOrder.stockOrderStatus = status;
    for(let item of this.selectedOrder.stockOrderItems) {
      if(item.stockOrderItemStatus != "NO_RECEIVED") {
        item.stockOrderItemStatus = status;
      }
    }
  }

  guardarOrden() {
    
    if(!this.checkUbicaciones()) {
      return;
    }
    this.setStatus(this.storedStatus);

    Swal.fire({
      title: '¿Está seguro de marcar la Orden ' + this.selectedOrder.id + ' como ALMACENADA?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Almacenar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.orderStServ.putStatusOrderStock("STORED", this.selectedOrder).subscribe({
          next: () => {
            Swal.fire({
              title: 'Orden ' + this.selectedOrder.id + ' marcada como ALMACENADA',
              icon: 'success',
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

  checkUbicaciones(): boolean {
    for(let item of this.selectedOrder.stockOrderItems) {

      var lockers = {} as Locker[];
      var lockerSel = document.getElementById(item.id.toString()) as HTMLSelectElement | null;
      if (lockerSel != null) {
        const value = lockerSel.value;
        if(item.actualQuantity > 0 && (value == null || value == "")) {
          Swal.fire({
            title: 'Debe Seleccionar Locker para almacenar el producto ' + item.product.name,
            icon: 'warning',
            confirmButtonText: "Ok",
          });
          return false;
        } 
        var locker = {} as Locker;
        locker.id = Number(value);
        lockers = [];
        lockers.push(locker);
      }
      item.lockersToSave = lockers;
    }
    return true;
  }
  
}
