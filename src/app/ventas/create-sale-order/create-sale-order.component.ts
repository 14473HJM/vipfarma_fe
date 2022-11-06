import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Customer } from 'src/interfaces/Customer';
import { SaleOrder } from 'src/interfaces/sale-order';
import { User } from 'src/interfaces/User';
import { CustomerService } from 'src/services/customer.service';
import { SaleOrderService } from 'src/services/sale-order.service';
import { Router } from '@angular/router';
import { CreateCustomerComponent } from '../../Customer/create-customer/create-customer.component';
import { SearchProductsComponent } from 'src/app/products/search-products/search-products.component';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { Product } from 'src/interfaces/Product';
import { OfferStock } from 'src/interfaces/OfferStock';
import { OfferService } from 'src/services/offer.service';
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-create-sale-order',
  templateUrl: './create-sale-order.component.html',
  styleUrls: ['./create-sale-order.component.css']
})
export class CreateSaleOrderComponent implements OnInit {

  customers = {} as Customer[];
  ocultarTB: boolean = true;
  mostrarTB: boolean = false;
  customer: Customer = {} as Customer;
  selectedCustomer: Customer;
  saleOrder = {} as SaleOrder;
  user = {} as User;
  filterCustomer: string = '';
  public page: number;

  //poli
  messageName: string = '';
  messageBarcode: string = '';
  activeName: boolean = false;
  activeBarcode: boolean = false;
  products: Product[] = [];
  offers: OfferStock[] = [];
  offer: OfferStock = {} as OfferStock;
  change: Boolean = false;
  modalSwitch: boolean = false;
  selectedItem = {} as Product;

  //poli

  private subscription = new Subscription();

  constructor(
    private customerService: CustomerService,
    private saleOderService: SaleOrderService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private offerService: OfferService) { }

  ngOnInit(): void {
    this.refresh()
    this.activeName = true;
    this.activeBarcode = false;
  }


  refresh() {
    this.subscription.add(
      this.customerService.getCustomers().subscribe({
        next: (response: Customer[]) => {
          this.customers = response;
          this.ocultarTB = true;
          this.mostrarTB = false;
          this.filterCustomer = '';
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


  // saveOrder() {
  //   this.saleOderService.createSaleOrder(this.saleOrder).subscribe({
  //     next: () => {
  //       Swal.fire({
  //         title: 'Orden creada correctamente',
  //         icon: 'success',
  //         confirmButtonText: "Ok",
  //       });
  //     },
  //     error: () => {
  //       Swal.fire({
  //         title: 'Error al intentar crear la orden de venta',
  //         icon: 'error',
  //         confirmButtonText: "Ok",
  //       });
  //     }
  //   })
  // }

  onSelectionChange(customer: Customer) {
    this.selectedCustomer = customer;
    this.ocultarTB = false;
    this.mostrarTB = true;
  }


  activateName() {
    this.activeName = true;
    this.activeBarcode = false;
    this.messageBarcode = '';
  }

  activateBarcode() {
    this.activeName = false;
    this.activeBarcode = true;
    this.messageName = '';
  }

  searchProducts() {
    if (this.messageName !== '' && this.activeName == true) {
      this.messageName.toLowerCase();
      this.productService.getSearchedByName(this.messageName).subscribe({
        next: (products: Product[]) => {
          console.log(products);
          this.products = products;
        },
        error: () => {
          alert('error al obtener los productos')
        }
      });
    }
    else if (this.messageBarcode !== '' && this.activeBarcode == true) {
      this.productService.getSearchedByCodebar(this.messageBarcode).subscribe({
        next: (products: Product[]) => {
          console.log(products)
          this.products = products;
        },
        error: () => {
          alert('error al obtener los productos')
        }
      });
    }
    else {
      alert("Debe ingresar parametro de busqueda en el campo seleccionado")
    }
  }

  onSelectionChange2(item: Product): Boolean {
    this.selectedItem = item;
    this.offerService.getOfferByProduct(item.id, this.selectedCustomer.healthInsurancePlan.id).subscribe({
      next: (offers: OfferStock) =>{
        console.log(offers);
        this.offer=offers;
        console.log(this.offer);
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == HttpStatusCode.InternalServerError) {
          alert("Error al obtener las ofertas");
        } else if(err.status == HttpStatusCode.NotFound) {
          alert('No hay stock para el producto seleccionado');
        }
      }});
    this.change= true;
    return this.change;
  }

}
