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
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { SaleOrderItems } from 'src/interfaces/sale-order-items';
import { BranchOffice } from 'src/interfaces/BranchOffice';
import { UserService } from 'src/services/user.service';
import { BranchOfficeService } from 'src/services/branch-office.service';
import { borderRightStyle } from 'html2canvas/dist/types/css/property-descriptors/border-style';
import { OrderItem } from 'src/interfaces/order-item';
import { isNgContent } from '@angular/compiler';
import { HelperService } from 'src/services/HelperService';

@Component({
  selector: 'app-create-sale-order',
  templateUrl: './create-sale-order.component.html',
  styleUrls: ['./create-sale-order.component.css']
})
export class CreateSaleOrderComponent implements OnInit {

  branchoffice = {} as BranchOffice[];
  customers = {} as Customer[];
  ocultar: boolean = true;
  mostrar: boolean = false;
  customer: Customer = {} as Customer;
  selectedCustomer: Customer;
  saleOrder = {} as SaleOrder;
  user = {} as User;
  filterCustomer: string = '';
  public page: number;
  modalRef: MdbModalRef<CreateCustomerComponent> | null = null;
  messageName: string = '';
  messageBarcode: string = '';
  activeName: boolean = false;
  activeBarcode: boolean = false;
  products: Product[] = [];
  product = {} as Product;
  offers: OfferStock[] = [];
  offer: OfferStock = {} as OfferStock;
  change: Boolean = false;
  click: Boolean = false;
  modalSwitch: boolean = false;
  selectedItem = {} as Product;
  itemsOffer: OfferStock[] = [];
  selOffer = {} as OfferStock;
  cant: number = 1;
  precioTotal: number;
  precioUnitario: number;
  totalOdenVenta: number;
  usu: string;
  orderItems: OrderItem[] = [];
  orderItem = {} as OrderItem;
  prescription: string;
  refresh: number;
  cantprod: number[]=[];
  cantidades: number;

  private subscription = new Subscription();

  constructor(
    private customerService: CustomerService,
    private saleOderService: SaleOrderService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private offerService: OfferService,
    private modalService: MdbModalService,
    private userService: UserService,
    private helper: HelperService) { }

  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerUsuario();
    this.activeName = true;
    this.activeBarcode = false;
    this.totalOdenVenta = 0;
    this.refreshCustomer()
  }

  refreshCustomer(){
    this.obtenerClientes()
    this.helper.customMessage.subscribe(num => {
      this.refresh=num
      if(num==2){
        this.obtenerClientes();
      }
    });
  }

  obtenerClientes() {
    this.subscription.add(
      this.customerService.getCustomers().subscribe({
        next: (response: Customer[]) => {
          this.customers = response;
          this.ocultar = true;
          this.mostrar = false;
          this.filterCustomer = '';
          this.clean();
          this.products = [];
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

  openModalCustomer() {
    this.modalRef = this.modalService.open(CreateCustomerComponent)
  }

  onSelectionChange(customer: Customer) {
    this.selectedCustomer = customer;
    this.ocultar = false;
    this.mostrar = true;
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

  clean() {
    this.messageName = '';
    this.messageBarcode = '';
    this.cant = 1;
  }


  searchProducts() {
    if (this.messageName !== '' && this.activeName == true) {
      this.messageName.toLowerCase();
      this.productService.getSearchedByName(this.messageName).subscribe({
        next: (products: Product[]) => {
          this.products = products;

          for (let i = 0; i < this.products.length; i++) {
            const list = this.products[i];
            if (list.prescriptionRequired == true) {
              this.products[i].prescription = "Si";
            } else {
              this.products[i].prescription = "No";
            }
          }

        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener los productos por Nombre',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        }
      });
    }
    else if (this.messageBarcode !== '' && this.activeBarcode == true) {
      this.productService.getSearchedByCodebar(this.messageBarcode).subscribe({
        next: (products: Product[]) => {
          this.products = products;
        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener los productos por Código de barras',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        }
      });
    }
    else {
      Swal.fire({
        title: 'Debe ingresar parametro de búsqueda en el campo seleccionado',
        icon: 'warning',
        confirmButtonText: "Ok",
      });
    }
  }


  onSelectionChange2(item: Product): Boolean {
    this.selectedItem = item;
    this.offerService.getOfferByProduct(item.id, this.selectedCustomer.healthInsurancePlan.id).subscribe({
      next: (respuesta: OfferStock) => {
        this.offer = respuesta;
        if (respuesta.finalPrice == null) {
          this.offer.finalPrice = this.selectedItem.price;
        }
        if (respuesta.discountValue == null) {
          this.offer.discountValue = 0;
        } else {
          this.offer.discountValue = respuesta.discountValue * 100;
        }
        if (this.offer.discountValue != null && this.offer.finalPrice != null) {
          this.precioUnitario = (this.offer.finalPrice - (this.offer.finalPrice * (this.offer.discountValue) / 100));
        } else {
          this.offer.discountValue = 0;
        }
        this.precioTotal = this.precioUnitario * 1;
        this.clean();

      },
      error: () => {
        Swal.fire({
          title: 'No hay stock de ese producto',
          icon: 'info',
          confirmButtonText: "Ok",
        });
      }
    });
    this.change = true;
    return this.change;
  }
  

  onSelectionChange3(offer: OfferStock, cant: number) {
    this.offer.finalPrice = this.precioTotal;
    this.totalOdenVenta += this.precioTotal;
    this.itemsOffer.push(offer);
    this.cantprod.push(this.cant);
    this.orderItem.offer = offer;
    // this.orderItem.quantity = this.cant;
    this.orderItem.quantity= this.cantidades;
    this.orderItem.unitaryPrice = this.selectedItem.price;
    if (this.offer.discountValue != 0 && this.offer.discountValue != null) {
      this.orderItem.discountAmount = this.offer.discountValue
    }
    this.orderItem.totalPrice = this.precioTotal;
    this.orderItems.push(this.orderItem);
  
    this.click = true;
    this.change = false;
    this.precioTotal = 0;
    this.clean();
  }

  onDelete(i: number) {
    this.itemsOffer.splice(i, 1);
    if(this.itemsOffer.length < i+1){
      this.totalOdenVenta = 0;
    }

  }

  calcular(cant: number) {
    this.precioTotal = this.precioUnitario * cant;
    this.cantidades=cant;
  }
  
  obtenerUsuario() {
    this.usu = this.userService.getToken()
    this.subscription.add(
      this.userService.getUser(this.usu).subscribe({
        next: (response: User) => {
          this.user = response;
        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener el usuario',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      }),
    );
  }

  generarSaleOrderItems() {
    this.saleOrder.customer = this.selectedCustomer;
    this.saleOrder.user = this.user;
    this.saleOrder.branchOffice = this.user.branchOffice;
    this.saleOrder.totalAmount = this.totalOdenVenta;
    this.saleOrder.saleOrderItems = this.orderItems;

    Swal.fire({
      title: '¿Desea generar la orden de venta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.saleOderService.createSaleOrder(this.saleOrder).subscribe({
          next: () => {
            Swal.fire({
              title: 'Orden generada correctamente',
              icon: 'success',
              confirmButtonText: "Ok",
            });
            this.ngOnInit();
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
    })
  }

}
