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
    this.createProds = {} as Product;
    
  }

  refresh(){
    this.createProds.name="";
    this.createProds.barcode=0
    this.createProds.laboratory="";
    this.createProds.price=0
  }

  getLabs(){
    this.labs= this.selectLab.getLaboratories();
  }


  saveProduct() {

    if(this.createProds.name==null || this.createProds.name==""){
      Swal.fire({
        title: 'Debe ingresar el nombre del producto',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return;

    }
    if(this.createProds.barcode==null || this.createProds.barcode==0){
      Swal.fire({
        title: 'Debe ingresar el codigo del producto',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return;

    }
    if(this.createProds.laboratory==null || this.createProds.laboratory==""){
      Swal.fire({
        title: 'Debe ingresar el nombre del laboratorio del producto',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return;

    }
    if(this.createProds.price==null || this.createProds.price==0){
      Swal.fire({
        title: 'Debe ingresar el precio del producto',
        icon: 'error',
        confirmButtonText: "Ok",
      });
      return;

    }


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
              this.ngOnInit();
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
