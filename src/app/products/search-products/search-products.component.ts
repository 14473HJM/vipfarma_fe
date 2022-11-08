import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Product } from 'src/interfaces/Product';

import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  messageName: string = '';
  messageBarcode: string = '';
  activeName: boolean = false;
  activeBarcode: boolean = false;
  products: Product[] = [];

  constructor(public modalRef: MdbModalRef<SearchProductsComponent>, 
    private router: Router, 
    private productService: ProductService) { }

  ngOnInit(): void {
    this.activeName = false;
    this.activeBarcode = true;
  }

  activateName() {
    this.activeName = true;
    this.activeBarcode = false;
    this.messageBarcode = '';

  }

  activateBarcode() {
    this.activeName = false;
    this.activeBarcode = true;
    this.messageName = '';
  }


  searchProducts() {
    if (this.messageName !== '' && this.activeName == true) {
      this.productService.getSearchedByName(this.messageName).subscribe({
        next: (products: Product[]) => {
          console.log(products);
          this.products = products;
        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener los productos',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        }
      });
    }
    else if (this.messageBarcode !== '' && this.activeBarcode == true) {
      this.productService.getSearchedByCodebar(this.messageBarcode).subscribe({
        next: (products: Product[]) => {
          console.log(products)
          this.products = products;
        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener los productos',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        }
      });
    }
    else {
      Swal.fire({
        title: 'Debe ingresar parámetro de búsqueda en el campo seleccionado',
        icon: 'warning',
        confirmButtonText: "Ok",
      });
    }
  }
}
