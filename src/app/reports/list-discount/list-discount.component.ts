import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { OfferStock } from 'src/interfaces/OfferStock';
import { OfferService } from 'src/services/offer.service';
import { healthInsurance } from 'src/interfaces/healthInsurance';
import { HealthInsuranceService } from 'src/services/health-insurance.service'; 
import { healthInsurancePlan } from 'src/interfaces/healthInsurancePlan';
import { HealthInsurancePlanService } from 'src/services/health-insurance-plan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-discount',
  templateUrl: './list-discount.component.html',
  styleUrls: ['./list-discount.component.css'],
  providers: [HealthInsuranceService],
})
export class ListDiscountComponent implements OnInit {

  
  //@Input() id: string='';

  public formulario : FormGroup = new FormGroup({});
  public page: number;

  discounts: OfferStock[] = [];
  filterDiscounts: string = '' ;
  filterhealthInsurancePlan: string='';
  private subscription = new Subscription();
  private subscription2 = new Subscription();
  
  selectedHealthInsurance=0;

  listHealthInsurance= {} as healthInsurance[];
  listHealthInsurancePlan= {} as healthInsurancePlan[];

  

  constructor(
    private offerService: OfferService, //corresponde a OfferStock
    private selectHealthInsu: HealthInsuranceService,
    private selectHealthInsuPlan: HealthInsurancePlanService,
    private router: Router,
    private formBuild: FormBuilder
    ) {
      this.formulario= formBuild.group({
        hInsu : ["", Validators.required],
        hInsuPlan : ["", Validators.required]
  
      });
     }

    
    
  ngOnInit(): void {
    this.refreshList();
    this.getPlans();
    this.getHealthI();
  //this.onSelect();
    
  }

  

  

  refreshList() {
    this.subscription.add(
      this.offerService.getOffer().subscribe({

        next: (respuesta: OfferStock[]) => {
          this.discounts= respuesta;
        },
        error: () => {
          alert('error al comunicarse con la API');
          },
      }),



    );
  }

  // onSelect(id: number): void {
    
  //   this.subscription.add(
  //     this.healthInsurancePlanService.gethealthInsurancePlans().subscribe({
        
  //     })
  //   )
    
  // }

  getHealthI(){
    this.selectHealthInsu.gethealthInsurance().subscribe({
      next: (respuesta: healthInsurance[]) => {
        this.listHealthInsurance= respuesta;
      },
      error: () => {
        alert('error al comunicarse con la API');
        },
    })
  }
  

  getPlans(){
    this.formulario.get("hInsu")?.valueChanges.subscribe(selectedValue => {
    console.log('hInsu cambio')
    console.log(selectedValue)
    console.log(this.formulario.get("hInsu")?.value)
    
    this.subscription2.add(
      this.selectHealthInsuPlan.gethealthInsurancePlan(selectedValue).subscribe({
        next: (respuesta2: healthInsurancePlan[]) => {
          this.listHealthInsurancePlan = respuesta2;
        },
        error: () => {
          alert('error al comunicarse con la API');
        },

      }),    
      
      
    )
    

  })
}


}


