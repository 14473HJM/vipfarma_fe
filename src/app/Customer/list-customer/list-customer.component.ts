import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { Customer } from 'src/interfaces/Customer';
import { CustomerService } from 'src/services/customer.service';
import Swal from 'sweetalert2';
import { CreateCustomerComponent } from '../create-customer/create-customer.component';
import { HelperService } from 'src/services/HelperService';


@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css'],
  entryComponents: [ CreateCustomerComponent ]
})
export class ListCustomerComponent implements OnInit{

  @ViewChild(CreateCustomerComponent) 
  private listadoCustomer: CreateCustomerComponent;


  listado: Customer[]= {} as Customer[];
  private subscription = new Subscription();
  selectCust = {} as Customer;
  modalRef: MdbModalRef<CreateCustomerComponent> | null = null;
  filterCustomer: string = '';
  public page: number;
  agregar: boolean=false;

  refresh: number;
  editrefresh: number;

  constructor(private router: Router, 
    private customerService: CustomerService, 
    private modalService: MdbModalService,
    private helper: HelperService) { }



  ngOnInit(): void {
    this.getCustomer()
    this.helper.customMessage.subscribe(num => {
      this.refresh=num
      if(num==2){
        this.getCustomer();
      }
    });

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openModalCustomer() {
    this.modalRef = this.modalService.open(CreateCustomerComponent)
  }

  getCustomer(){
    this.subscription.add(
      this.customerService.getCustomers().subscribe({
        next: (respuesta: Customer[]) => {
          this.listado = respuesta;            
        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener la lista de clientes de la API',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    );
  }


  alterCustomer(cust: Customer){
    this.cancelar();
    this.selectCust = cust;
  }

  cancelar() {
    this.selectCust = {} as Customer;
    this.getCustomer();
  }

}
