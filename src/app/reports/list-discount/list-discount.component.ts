import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OfferStock } from 'src/interfaces/OfferStock';
import { OfferService } from 'src/services/offer.service';
import { healthInsurance } from 'src/interfaces/healthInsurance';
import { HealthInsuranceService } from 'src/services/health-insurance.service'; 
import { healthInsurancePlan } from 'src/interfaces/healthInsurancePlan';
import { HealthInsurancePlanService } from 'src/services/health-insurance-plan.service';

@Component({
  selector: 'app-list-discount',
  templateUrl: './list-discount.component.html',
  styleUrls: ['./list-discount.component.css'],
  providers: [HealthInsuranceService],
})
export class ListDiscountComponent implements OnInit {

  
  @Input() id: string='';

  discounts: OfferStock[] = [];
  filterDiscounts: string = '' ;
  private subscription = new Subscription();
  healthInsurance: healthInsurance[]=[];
  healthInsurancePlan: healthInsurancePlan[]=[];

  constructor(
    private offerService: OfferService, //corresponde a OfferStock
    private healthInsuranceService: HealthInsuranceService,
    private healthInsurancePlanService: HealthInsurancePlanService,
    private router: Router
    ) { }

    
    
  ngOnInit(): void {
    this.refreshList();
    this.gethealthInsuranceSelected();
    
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

  onSelect(id: number): void {
    
    this.subscription.add(
      this.healthInsurancePlanService.gethealthInsurancePlans().subscribe({
        
      })
    )
    
  }

  gethealthInsuranceSelected() {
    this.subscription.add(
      this.healthInsuranceService.gethealthInsurance().subscribe({

        next: (respuesta: healthInsurance[]) => {
          this.healthInsurance= respuesta;
        },
        error: () => {
          alert('error al comunicarse con la API');
          },
      }),
    );
  }
}
