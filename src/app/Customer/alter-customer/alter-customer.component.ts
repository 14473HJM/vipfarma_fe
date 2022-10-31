import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/interfaces/Customer';
import { CustomerService } from 'src/services/customer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { healthInsurance } from 'src/interfaces/healthInsurance';
import { HealthInsuranceService } from 'src/services/health-insurance.service';

@Component({
  selector: 'app-alter-customer',
  templateUrl: './alter-customer.component.html',
  styleUrls: ['./alter-customer.component.css']
})
export class AlterCustomerComponent implements OnInit {
  customer: Customer= {} as Customer;
  healthinsurance:  healthInsurance[];

  private subscription = new Subscription();

  constructor(private customerService: CustomerService, private healthInsuranceService: HealthInsuranceService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomer();
    this.getHealthInsurance();
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

  sethealthInsurance(obs: Customer["healthInsurance"])
  {
    console.log
    this.customer.healthInsurance=obs
    this.customer.healthInsuranceId=obs.id
    this.customer.healthInsurancePlan.name="Selecione un plan"
  }
  sethealthInsurancePlan(plan: Customer["healthInsurancePlan"])
  {
    this.customer.healthInsurancePlan=plan;
  }

  private getCustomer() {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          const id = params['id'];
          this.customerService.getCustomer(id).subscribe({
            next: (respuesta: Customer) => {
              this.customer = respuesta;
            },
            error: () => {
              alert('error al obtener el cliente');
            },
          });
        },
      })
    );
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
    if(this.customer.healthInsurance == null ||this.customer.healthInsurancePlan == null ){
      alert(`Debe introducir correctamente la obra social y el plan correspondiente`)
      return
    } 


   
      this.subscription.add(
        this.customerService.postCreate(this.customer).subscribe({
          next: () => {
            alert('Cliente modificado correctamente')
            this.router.navigate(['listcustomer']);
          },
          error: () => {
            alert('Error al guardar el cliente');
          }
        })
      );
    

  }




}
