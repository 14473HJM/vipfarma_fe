import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import { SearchProductsComponent } from 'src/app/products/search-products/search-products.component';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';

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
    private modalService: MdbModalService,
    private productService: ProductService) { }

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
        Swal.fire({
          title: 'Error al obtener los clientes',
          icon: 'error',
          confirmButtonText: "Ok",
        });
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
    this.modalRef = this.modalService.open(SearchProductsComponent )
  }
  
  saveOrder() {
  this.saleOderService.createSaleOrder(this.saleOrder).subscribe({
        next: () => {
          Swal.fire({
            title: 'Orden creada correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });
        },
        error: () => {
          Swal.fire({
            title: 'Error al intentar crear la orden de venta',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        }
      })
  }

  // @ViewChild('createCustomer') createCustomer: createCustomer;
  // onClickOkButton(){
  //   this.createCustomer.doAction();
  // }



}
