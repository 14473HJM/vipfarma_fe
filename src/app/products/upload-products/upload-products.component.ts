import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Laboratory } from 'src/interfaces/Laboratory';
import { Product } from 'src/interfaces/Product';
import { LaboratoryService } from 'src/services/laboratory.service';
import { ProductService } from 'src/services/product.service';

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
    this.saveProd.postCreateProducts(this.createProds).subscribe({
          next: () => {
            alert("Producto ingresado con éxito");
          },
          error: () => {
            alert("Error al ingresar producto");
          }
        })
    }
}
