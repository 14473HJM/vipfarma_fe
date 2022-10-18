import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SaleOrderService } from 'src/services/sale-order.service';

@Component({
  selector: 'app-abm-order',
  templateUrl: './abm-order.component.html',
  styleUrls: ['./abm-order.component.css']
})
export class AbmOrderComponent implements OnInit {

  constructor(private saleOrderService: SaleOrderService, private router: Router) { }

  
  ngOnInit(): void {
   
  }

  

     // this.saleOrderService.getOffers()
    // .subscribe({
    //   next: (rta) =>{
    //     console.log(rta)
    //   },
    //   error: () =>{
    //     alert('error al obtener los porductos')
    //   }
    // })

  
}
