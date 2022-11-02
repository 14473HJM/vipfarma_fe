import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/interfaces/Customer';
import { CustomerService } from 'src/services/customer.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  listado: Customer[]= {} as Customer[];
  private subscription = new Subscription();
  counter: number;

  constructor(private router: Router, private customerService: CustomerService ) { }

  ngOnInit(): void {
    this.getCustomer()
    this.counter=0;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCustomer(){
    this.subscription.add(
      this.customerService.getCustomers().subscribe({
        next: (respuesta: Customer[]) => {

          for(const lst of respuesta){
            this.counter+=1
          }
          
              this.listado = respuesta;
            },
            error: () => {
              alert('Error al traer el listado de la api');
            },
          })
          );
        }

  alterCustomer(id: number){
    console.log(id)
    this.router.navigate(['altercostumber', id]);
    
  }



}
