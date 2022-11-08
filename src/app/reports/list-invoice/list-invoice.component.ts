import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bill } from 'src/interfaces/Bill';
import { BillService } from 'src/services/bill.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {

  private subscription = new Subscription();


  public page: number;
  since: Date;
  until: Date;
  offers: string[]=[];
  bill: Bill[]= {} as Bill[];
  preview = {} as Bill;
  hide: boolean=false;
  totalfac: number;
  cae: number;

  constructor(private billService: BillService) { 

  }

  ngOnInit(): void {
    this.getBill();
  

  }

  onSelection(id: string, total: number) {
    //this.selectedOrder = order;
    console.log(id);
    this.hide=true;
    this.totalfac=total;
    this.setCae();

    this.billService.getBill(id).subscribe({
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

  descargar() {
    var data = document.getElementById('listado');
    if(data !== null) {
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        let imgWidth = 208;   
        let imgHeight = canvas.height * imgWidth / canvas.width;  
  
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        let position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('reporteFactura.pdf'); // Generated PDF   
      });
    } 
  }

  setCae(){
    this.cae=Math.floor(Math.random() * 151555121686721);
  
  }

  getBill(){
    this.subscription.add(
      this.billService.getBills().subscribe({
        next: (respuesta: Bill[]) => {
          this.bill = respuesta;      
        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener la lista de facturas',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    );
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
        pdf.save('invoice' + '_' + this.preview.id + '.pdf'); // Generated PDF   
      });
    }
    this.hide=false;
  }
  
  cancelar(){
    this.hide=false;
  }
}



