import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Laboratory } from 'src/interfaces/Laboratory';
import { Product } from 'src/interfaces/Product';
import { LaboratoryService } from 'src/services/laboratory.service';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-products',
  templateUrl: './upload-products.component.html',
  styleUrls: ['./upload-products.component.css'],
  providers:[LaboratoryService],
})
export class UploadProductsComponent implements OnInit {

  labs: Laboratory[] = [];
  createProds = {} as Product;

  private subscription = new Subscription();

  constructor(private selectLab: LaboratoryService, private saveProd: ProductService) { }

  ngOnInit(): void {
    this.getLabs();
  }

  getLabs(){
    this.labs= this.selectLab.getLaboratories();
  }


  saveProduct() {
    Swal.fire({
      
      title: '¿Desea ingresar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.saveProd.postCreateProducts(this.createProds).subscribe({
            next: () => {
              Swal.fire({
                title: 'Producto ingresado correctamente',
                icon: 'success',
                confirmButtonText: "Ok",
              });
              
            },
            error: () => {
              Swal.fire({
                title: 'Error al ingresar Producto',
                icon: 'error',
                confirmButtonText: "Ok",
              });
            },
          })
        )
      }
    });
  }


    
    // this.saveProd.postCreateProducts(this.createProds).subscribe({
    //       next: () => {
    //         alert("Producto ingresado con éxito");
    //       },
    //       error: () => {
    //         alert("Error al ingresar producto");
    //       }
    //     })
    // }
}
