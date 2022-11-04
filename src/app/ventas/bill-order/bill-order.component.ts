import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Bill } from 'src/interfaces/Bill';
import { SaleOrder } from 'src/interfaces/sale-order';
import { BillingService } from 'src/services/billing.service';
import { SaleOrderService } from 'src/services/sale-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bill-order',
  templateUrl: './bill-order.component.html',
  styleUrls: ['./bill-order.component.css']
})
export class BillOrderComponent implements OnInit {

  saleOrder = {} as SaleOrder[];
  selectedOrder = {} as SaleOrder;
  bill = {} as Bill;
  preview = {} as Bill;
  apply : boolean = false;
  filterCustomer: string = '';

  constructor(private saleOrderSrv : SaleOrderService, private router: Router,
    private billSrv : BillingService) { }

  ngOnInit(): void {
			this.refresh();
  }

  refresh() {
    this.saleOrderSrv.getSaleOrdersReadyToBill().subscribe({
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

    this.billSrv.billOrder(this.selectedOrder.id, true).subscribe({
      next: (response: Bill) => {
        this.preview = response;
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

  facturar() {
    Swal.fire({
      title: 'Seguro desea Facturar la Orden ' + this.selectedOrder.id + ' ??',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Facturar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.billSrv.billOrder(this.selectedOrder.id, false).subscribe({
          next: (response: Bill) => {
            Swal.fire({
              title: 'Orden ' + this.selectedOrder.id + ' Facturada !!',
              icon: 'success',
              confirmButtonText: "Ok",
            });
            this.bill = response;
            this.refresh();
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
    })
  }

  eliminar(id : number) {
    Swal.fire({
      title: 'Seguro desea Borrar la Orden ' + id + ' ??',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.saleOrderSrv.changeStatus(id, "CLOSED").subscribe({
          next: () => {
            Swal.fire({
              title: 'Orden ' + id + ' Borrada !!',
              icon: 'info',
              confirmButtonText: "Ok",
            });
            this.refresh();
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
    })
    

    
  }

  cancelar() {
    this.bill = {} as Bill;
    this.preview = {} as Bill;
    this.selectedOrder = {} as SaleOrder;
    this.apply = false;
    this.refresh();
  }

  pdf() {
    var data = document.getElementById('invoice');
    if(data !== null) {
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        let imgWidth = 208;   
        let imgHeight = canvas.height * imgWidth / canvas.width;  
  
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        let position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('invoice' + '_' + this.bill.id + '.pdf'); // Generated PDF   
      });
    }
  }

}
