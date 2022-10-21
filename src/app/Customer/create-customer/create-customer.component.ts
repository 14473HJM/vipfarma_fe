import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/interfaces/Customer';
import { CustomerService } from 'src/services/customer.service';
import { healthInsurance } from 'src/interfaces/healthInsurance';
import { healthInsurancePlan } from 'src/interfaces/healthInsurancePlan';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HealthInsuranceService } from 'src/services/health-insurance.service';
import { HealthInsurancePlanService } from 'src/services/health-insurance-plan.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customer: Customer= {} as Customer;
  healthinsurance:  healthInsurance[];
  obs: healthInsurance = {} as healthInsurance;
  private subscription = new Subscription();
  availablePlans: healthInsurancePlan[];
  healthInsuranceId: any;

  constructor(private router: Router, private customerService: CustomerService, private healthInsuranceService: HealthInsuranceService, private healthInsurancePlanService: HealthInsurancePlanService ) {
   }

  ngOnInit(): void {
    this.getHealthInsurance()
  
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
          alert('Error al obtener el listado de obras sociales');
        },
      })
    );

  }

  sethealthInsuranceId(obs: healthInsurance)
  {
    this.customer.healthInsurance=obs
    this.customer.healthInsuranceId=obs.id
    this.customer.healthInsurancePlanId=0;
  }

  save(){
    if(this.customer.lastName == null || this.customer.lastName.trim().length ===0 || this.customer.name == null || this.customer.name.trim().length ===0){
      alert('Debe introducir el nombre completo')
      return
    }
    if(this.customer.identificationType == null){
      alert('Debe seleccionar el tipo de identificacion')
      return
    }
    if(this.customer.identification == null){
      alert(`Debe introducir correctamente el ${this.customer.identificationType}`)
      return
    }
    if(this.customer.address == null || this.customer.address.trim().length ===0){
      alert(`Debe introducir correctamente el domicilio`)
      return
    }
    if(this.customer.healthInsurance.id == null || this.customer.healthInsurance.id ===0 || this.customer.healthInsurancePlan.id == null || this.customer.healthInsurancePlan.id ===0){
      alert(`Debe introducir selecionar correctamente la obra social y su plan`)
      return
    }

   
      this.subscription.add(
        this.customerService.postCreate(this.customer).subscribe({
          next: () => {
            alert('Cliente cargado correctamente')
            this.reset();
            this.router.navigate(['customer']);
          },
          error: () => {
            alert('Error al guardar el cliente');
          }
        })
      );
    

  }

  reset(){
    this.customer={} as Customer;
    
  }



}
