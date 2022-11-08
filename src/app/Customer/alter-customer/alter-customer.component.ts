import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from 'src/interfaces/Customer';
import { CustomerService } from 'src/services/customer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { healthInsurance } from 'src/interfaces/healthInsurance';
import { HealthInsuranceService } from 'src/services/health-insurance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alter-customer',
  templateUrl: './alter-customer.component.html',
  styleUrls: ['./alter-customer.component.css']
})
export class AlterCustomerComponent implements OnInit {
  customer: Customer= {} as Customer;
  healthinsurance:  healthInsurance[];
  @Input() id: number;
  @Output() onUpdate = new EventEmitter();

  private subscription = new Subscription();

  constructor(private customerService: CustomerService, private healthInsuranceService: HealthInsuranceService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomer();
    this.getHealthInsurance();
  }

  ngOnChanges(): void {
    this.ngOnInit();
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
          this.customerService.getCustomer(this.id.toString()).subscribe({
            next: (respuesta: Customer) => {
              this.customer = respuesta;
            },
            error: () => {
              Swal.fire({
                title: 'Error al obtener el cliente',
                icon: 'error',
                confirmButtonText: "Ok",
              });
            },
          });
        },
      })
    );
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
              title: 'Cliente modificado correctamente',
              icon: 'success',
              confirmButtonText: "Ok",
            });
            this.onUpdate.emit();
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




}
