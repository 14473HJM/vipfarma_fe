import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bill } from 'src/interfaces/Bill';
import { BillService } from 'src/services/bill.service';
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

  constructor(private billService: BillService) { 

  }

  ngOnInit(): void {
    this.getBill();

  }

  descargar(){

  }

  getBill(){
    this.subscription.add(
      this.billService.getBills().subscribe({
        next: (respuesta: Bill[]) => {
          this.bill = respuesta;
          console.log(this.bill[0])            
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

}
