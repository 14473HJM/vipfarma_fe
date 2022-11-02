import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OfferStock } from 'src/interfaces/OfferStock';
import { OfferService } from 'src/services/offer.service';
import { healthInsurance } from 'src/interfaces/healthInsurance';
import { HealthInsuranceService } from 'src/services/health-insurance.service'; 
import { healthInsurancePlan } from 'src/interfaces/healthInsurancePlan';
import { HealthInsurancePlanService } from 'src/services/health-insurance-plan.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-list-discount',
  templateUrl: './list-discount.component.html',
  styleUrls: ['./list-discount.component.css'],
  providers: [HealthInsuranceService],
})
export class ListDiscountComponent implements OnInit {

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

  getHealthI(){
    this.selectHealthInsu.gethealthInsurances().subscribe({
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

descargar() {
  var data = document.getElementById('listado');
  if(data !== null) {
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;   
      let imgHeight = canvas.height * imgWidth / canvas.width;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('reporteDescuentos.pdf'); // Generated PDF   
    });
  } 
}


}


