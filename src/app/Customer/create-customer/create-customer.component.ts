import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
import { HelperService } from 'src/services/HelperService';







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
  availablePlans: healthInsurancePlan= {} as healthInsurancePlan;
  healthInsuranceId: any;
  sinobs: number=0;
  existsDNI: boolean=false;
  refrescar: boolean=false;
  controldni: string;

  refresh: number;
  editrefresh: number;


  constructor(public modalRef: MdbModalRef<CreateCustomerComponent>, 
    private router: Router, 
    private customerService: CustomerService, 
    private healthInsuranceService: HealthInsuranceService, 
    private healthInsurancePlanService: HealthInsurancePlanService,
    private helper: HelperService) {
   }


  ngOnInit(): void {
    this.getHealthInsurance()
    this.changeRefresh(1)
    this.customer.identificationType="tipo";
    this.helper.customMessage.subscribe(num => this.refresh = num);

  }

  changeRefresh(num: number) {
    this.editrefresh=num;
    this.helper.changeMessage(this.editrefresh);
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

    if(obs.id==1){
      this.sinobs=1;
     this.customer.healthInsurancePlan=obs.availablePlans[0]
     // console.log(obs.availablePlans[0]);

    }else {
      let plan = {} as healthInsurancePlan;
      plan.name = "sin";
      this.customer.healthInsurancePlan = plan;
      this.sinobs=0;
    }
    
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
    if(this.customer.identificationType == null || this.customer.identificationType=="tipo"){
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
    if(this.customer.healthInsurance == null ||this.customer.healthInsurancePlan == null || this.customer.healthInsurancePlan.name=="sin" ){
      Swal.fire({
        title: 'Debe introducir correctamente la obra social y el plan correspondiente',
        icon: 'warning',
        confirmButtonText: "Ok",
      });
      return
    } 
 


   this.controldni= this.customer.identification
      
      this.subscription.add(
        this.customerService.getCustomers().subscribe({
          next: (respuesta: Customer[]) => {
            for(const list of respuesta){
              if(list.identification==this.controldni){
                this.existsDNI=true;
                Swal.fire({
                  title: 'Ya existe una persona cargada con ese dni',
                  icon: 'warning',
                  confirmButtonText: "Ok",
                });
                return
              }else{ this.existsDNI=false } 
          }
          
          if(!this.existsDNI){
            this.subscription.add(
              this.customerService.postCreate(this.customer).subscribe({
                next: () => {
                  Swal.fire({
                    title: 'Cliente cargado correctamente',
                    icon: 'success',
                    confirmButtonText: "Ok",
                  });
                  this.changeRefresh(2);
                  this.modalRef.close();
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

          }

        },
          error: () => {
            Swal.fire({
              title: 'Error al validar los datos del dni',
              icon: 'error',
              confirmButtonText: "Ok",
            });
          },
        })
      );
      
     
    }


  reset(){
    this.existsDNI=false;
    this.customer={} as Customer;
    this.customer.identificationType="tipo";
  }

}
