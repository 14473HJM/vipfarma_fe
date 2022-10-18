import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/interfaces/Customer';
import { healthInsurance } from 'src/interfaces/healthInsurance';
import { healthInsurancePlan } from 'src/interfaces/healthInsurancePlan';
import { Subscription } from 'rxjs';
import { HealthInsuranceService } from 'src/services/health-insurance.service';
import { HealthInsurancePlanService } from 'src/services/health-insurance-plan.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customer: Customer;
  healthinsurance:  healthInsurance[];
  healthinsuranceplan: healthInsurancePlan[];
  private subscription = new Subscription();

  constructor(private healthInsuranceService: HealthInsuranceService, private healthInsurancePlanService: HealthInsurancePlanService ) {
   }

  ngOnInit(): void {
    this.getHealthInsurance()
    this.getHealthInsurancePlan()
  
  }

  getHealthInsurance(){
    this.subscription.add(
      this.healthInsuranceService.gethealthInsurances().subscribe({
        next: (respuesta: healthInsurance[]) => {
          this.healthinsurance = respuesta;
          alert('obra social cargadas');
        },
        error: () => {
          alert('Error al obtener el listado de obras sociales');
        },
      })
    );

  }

  getHealthInsurancePlan(){
    this.subscription.add(
      this.healthInsurancePlanService.gethealthInsurancePlans().subscribe({
        next: (respuesta: healthInsurancePlan[]) => {
          this.healthinsuranceplan = respuesta;
          alert('Planes cargados');
        },
        error: () => {
          alert('Error al obtener el listado de planes');
        },
      })
    );

  }



}
