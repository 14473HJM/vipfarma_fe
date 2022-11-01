import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/interfaces/Customer';
import { SaleOrder } from 'src/interfaces/sale-order';
import { User } from 'src/interfaces/User';
import { CustomerService } from 'src/services/customer.service';
import { SaleOrderService } from 'src/services/sale-order.service';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CreateCustomerComponent } from '../../Customer/create-customer/create-customer.component';

@Component({
  selector: 'app-create-sale-order',
  templateUrl: './create-sale-order.component.html',
  styleUrls: ['./create-sale-order.component.css']
})
export class CreateSaleOrderComponent implements OnInit {
  

  customers = {} as Customer[];
  saleOrder = {} as SaleOrder;
  user = {} as User;
  sel = {} as Customer;
  customer: Customer = {} as Customer;
  cusOs: string;
  cusOsP: string;
  cusDni: string;
  cusDniType: string;
  modalRef: MdbModalRef<CreateCustomerComponent> | null = null;

  private subscription = new Subscription();

  constructor(
    private customerService: CustomerService, 
    private saleOderService: SaleOrderService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.refresh()
  }


  refresh() {
    this.subscription.add(
    this.customerService.getCustomers().subscribe({
      next: (response: Customer[]) => {
        this.customers = response;
        console.log(this.customers);
      },
      error: () => {
        alert('error al obtener los clientes');
      },
    }),
    );
  }

  listado(d: Customer){
    this.customer = d;
    this.cusOs = d.healthInsurance.name;
    this.cusOsP = d.healthInsurancePlan.name;
    this.cusDni = `${d.identificationType} ${d.identification} `
    ;
  }
  
  openModalCustomer() {
    this.modalRef = this.modalService.open(CreateCustomerComponent)
  }
  openModalOffer() {
    //this.modalRef = this.modalService.open(SearchProductsComponent )
  }

  
  saveOrder() {
  this.saleOderService.createSaleOrder(this.saleOrder).subscribe({
        next: () => {
          alert("Orden de venta creada correctamente");
        },
        error: () => {
          alert("Error al intentar crear la ordern de venta");
        }
      })
  }
}
