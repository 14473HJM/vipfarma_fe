import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Bill } from 'src/interfaces/Bill';
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
  bill = {} as Bill;

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
}

  facturar() {
    this.billSrv.billOrder(this.selectedOrder.id).subscribe({
      next: (response: Bill) => {
        this.bill = response;
        this.refresh();
      },
      error: () => {
        alert("Error en el Servicio");
      },
    })
  }

  eliminar(id : number) {
    const result: boolean = confirm(
      'Está seguro que desea borrar la Orden ' + id + ' ???'
    );

    if (result) {
        this.saleOrderSrv.changeStatus(id, "CLOSED").subscribe({
          next: () => {
            this.refresh();
          },
          error: () => {
            alert('error al borrar la orden');
          },
        })
    }
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
