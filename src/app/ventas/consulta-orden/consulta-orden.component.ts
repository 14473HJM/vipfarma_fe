import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SaleOrder } from 'src/interfaces/sale-order';
import { SaleOrderService } from 'src/services/sale-order.service';

@Component({
  selector: 'app-consulta-orden',
  templateUrl: './consulta-orden.component.html',
  styleUrls: ['./consulta-orden.component.css']
})
export class ConsultaOrdenComponent implements OnInit {

  saleOrderList: SaleOrder[]=[];
  private subscription = new Subscription();
  titulo: any;

  constructor(private saleOrderService: SaleOrderService, private router: Router) { }

  ngOnInit(): void {
  //  this.getSaleOrders();
  }

  // getSaleOrders(){
  //   this.saleOrderService.getOrders()
  //   .subscribe({
  //     next: (salesOrders: SaleOrder[]) =>{
  //       // for(const so of salesOrders){
          
  //       // }
        
  //       console.log(salesOrders)
  //     },
  //     error: () =>{
  //       alert('error al obtener los porductos')
  //     }
  //   })
  }
