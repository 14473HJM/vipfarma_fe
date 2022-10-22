import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OfferStock } from 'src/interfaces/OfferStock';

import { OfferService } from 'src/services/offer.service';


@Component({
  selector: 'app-list-offer',
  templateUrl: './list-offer.component.html',
  styleUrls: ['./list-offer.component.css']
})
export class ListOfferComponent implements OnInit {

  @Input() id: string="";

  offers: OfferStock[] = [];
  filterProducts: string = '' ;
  private subscription = new Subscription();
  

  constructor(
    private offerService: OfferService, //corresponde a OfferStock
  
    private router: Router
    ) { }

    
    
  ngOnInit(): void {
    this.refreshList();
  }

  // refreshList() {
  //   this.subscription.add(
  //     this.productService.obtener().subscribe({
  //       next: (products: Product[]) => {
  //          this.offerService.getOffer().subscribe({
  //            next: (respuesta: OfferStock[]) => {
  //              for (const offer of respuesta) {
  //               const productIndex = products.findIndex(
  //                 (x) => x.id === offer.productId
  //               );
  //               offer.product = products[productIndex];
  //             }

  //             this.list = respuesta;
  //           },
  //           error: () => {
  //             alert('error al comunicarse con la API');
  //           },
  //         });
  //       },
  //     })
  //   );
  // }

  refreshList() {
    this.subscription.add(
      this.offerService.getOffer().subscribe({

        next: (respuesta: OfferStock[]) => {
          this.offers= respuesta;
        },
        error: () => {
          alert('error al comunicarse con la API');
          },
      }),
    );
  }
  
  
    
  


}
