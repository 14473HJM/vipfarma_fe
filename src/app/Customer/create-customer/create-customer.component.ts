import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Customer } from 'src/interfaces/Customer';
import { CustomerService } from 'src/services/customer.service';
import { healthInsurance } from 'src/interfaces/healthInsurance';
import { healthInsurancePlan } from 'src/interfaces/healthInsurancePlan';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HealthInsuranceService } from 'src/services/health-insurance.service';
import { HealthInsurancePlanService } from 'src/services/health-insurance-plan.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})

export class CreateCustomerComponent implements OnInit {

  @Output() refresh: EventEmitter<any> = new EventEmitter();

  customer: Customer= {} as Customer;
  healthinsurance:  healthInsurance[];
  obs: healthInsurance = {} as healthInsurance;
  private subscription = new Subscription();
  //availablePlans: healthInsurancePlan[];
  availablePlans: healthInsurancePlan= {} as healthInsurancePlan;
  healthInsuranceId: any;

  constructor(public modalRef: MdbModalRef<CreateCustomerComponent>, 
    private router: Router, 
    private customerService: CustomerService, 
    private healthInsuranceService: HealthInsuranceService, 
    private healthInsurancePlanService: HealthInsurancePlanService ) {
   }

  ngOnInit(): void {
    this.getHealthInsurance()
    this.customer.identificationType="tipo";
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getHealthInsurance(){
    this.subscription.add(
      this.healthInsuranceService.gethealthInsurances().subscribe({
        next: (respuesta: healthInsurance[]) => {
          this.healthinsurance = respuesta;
        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener el listado de obras sociales',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    );

  }

  sethealthInsurance(obs: healthInsurance)
  {
    console.log
    this.customer.healthInsurance=obs
    this.customer.healthInsuranceId=obs.id
    this.customer.healthInsurancePlanId=0;
  }

  sethealthInsurancePlan(plan: healthInsurancePlan)
  {
    this.customer.healthInsurancePlan=plan;
  }

  save(){
    if(this.customer.lastName == null || this.customer.lastName.trim().length ===0 || this.customer.name == null || this.customer.name.trim().length ===0){
      Swal.fire({
        title: 'Debe introducir el nombre completo',
        icon: 'warning',
        confirmButtonText: "Ok",
      });
      return
    }
    if(this.customer.identificationType == null){
      Swal.fire({
        title: 'Debe seleccionar el tipo de identificación',
        icon: 'warning',
        confirmButtonText: "Ok",
      });
      return
    }
    if(this.customer.identification == null){
      Swal.fire({
        title: `Debe introducir correctamente el ${this.customer.identificationType}`,
        icon: 'warning',
        confirmButtonText: "Ok",
      });
      return
    }
    if(this.customer.address == null || this.customer.address.trim().length ===0){
      Swal.fire({
        title: 'Debe introducir correctamente el domicilio',
        icon: 'warning',
        confirmButtonText: "Ok",
      });
      return
    }
    if(this.customer.healthInsurance == null ||this.customer.healthInsurancePlan == null ){
      Swal.fire({
        title: 'Debe introducir correctamente la obra social y el plan correspondiente',
        icon: 'warning',
        confirmButtonText: "Ok",
      });
      return
    } 

    this.subscription.add(
      this.customerService.postCreate(this.customer).subscribe({
        next: () => {
          Swal.fire({
            title: 'Cliente cargado correctamente',
            icon: 'success',
            confirmButtonText: "Ok",
          });
          this.reset();
        },
        error: () => {
          Swal.fire({
            title: 'Error al guardar el cliente',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        }
      })
    );

    this.refresh.emit();
  }

  reset(){
    this.customer={} as Customer;
    this.customer.identificationType="tipo";
  }

}
