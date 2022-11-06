import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Laboratory } from 'src/interfaces/Laboratory';
import { Product } from 'src/interfaces/Product';
import { LaboratoryService } from 'src/services/laboratory.service';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alter-product',
  templateUrl: './alter-product.component.html',
  styleUrls: ['./alter-product.component.css']
})
export class AlterProductComponent implements OnInit {

  product: Product= {} as Product;
  lab:  Laboratory[];
  
  @Input() id: number;
  @Output() onUpdate = new EventEmitter();

  private subscription = new Subscription();

  constructor(private productService: ProductService, private labService: LaboratoryService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
    this.getLabs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
  getLabs(){
    this.lab= this.labService.getLaboratories();
  }

  setLaboratory(obs: Product["laboratory"])
  {
    console.log
    this.product.laboratory=obs
    
  }


  

  private getProduct() {
    this.subscription.add(
      this.activatedRoute.params.subscribe({
        next: (params) => {
          this.productService.getProduct(this.id.toString()).subscribe({
            next: (respuesta: Product) => {
              this.product = respuesta;
            },
            error: () => {
              Swal.fire({
                title: 'Error al obtener el producto',
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
    if(this.product.name == null || this.product.name.trim().length ===0 ){
      Swal.fire({
        title: 'Debe introducir un nombre',
        icon: 'warning',
        confirmButtonText: "Ok",
      });
      return
    }
    if(this.product.laboratory == null){
      Swal.fire({
        title: 'Debe seleccionar un laboratorio',
        icon: 'warning',
        confirmButtonText: "Ok",
      });
      return
    }
    // if(this.product.prescriptionRequired?){
    //   Swal.fire({
    //     title: 'Debe introducir correctamente el domicilio',
    //     icon: 'warning',
    //     confirmButtonText: "Ok",
    //   });
    //   return
    // }
    
   
      this.subscription.add(
        this.productService.postCreateProducts(this.product).subscribe({
          next: () => {
            Swal.fire({
              title: 'Producto modificado correctamente',
              icon: 'success',
              confirmButtonText: "Ok",
            });
            this.onUpdate.emit();
          },
          error: () => {
            Swal.fire({
              title: 'Error al guardar el producto',
              icon: 'error',
              confirmButtonText: "Ok",
            });
          }
        })
      );
    

  }




}
