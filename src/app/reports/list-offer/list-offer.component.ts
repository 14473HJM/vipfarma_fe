import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subscription } from 'rxjs';
import { OfferStock } from 'src/interfaces/OfferStock';
import { OfferService } from 'src/services/offer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css']
})
export class ListOfferComponent implements OnInit {

  @Input() id: string='';

  offers: OfferStock[] = [];
  filterProducts: string = '' ;
  private subscription = new Subscription();
  public page: number;
  

  constructor(
    private offerService: OfferService, //corresponde a OfferStock
    private router: Router) { }
    
  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.subscription.add(
      this.offerService.getOffer().subscribe({

        next: (respuesta: OfferStock[]) => {
          this.offers= respuesta;
        },
        error: () => {
          Swal.fire({
            title: 'Error al comunicarse con la API',
            icon: 'error',
            confirmButtonText: "Ok",
          });
          },
      }),
    );
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
        pdf.save('reposrteProductos.pdf'); // Generated PDF   
      });
    } 
  }

}
