import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/interfaces/Product';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';
import { HelperService } from 'src/services/HelperService';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: Product[]= [];
  private subscription = new Subscription();
  selectProd = {} as Product;
  filterProduct: string = '';
  transformTrueOrFalse: string='';
  public page: number;
  hide:boolean=false;

  refresh: number;
  editrefresh: number;


  constructor(private router: Router, 
    private prodService: ProductService,
    private helper: HelperService
    ) { }

  ngOnInit(): void {
    this.getProducts();
    this.helper.customMessage.subscribe(num => {
      this.refresh=num
      if(num==2){
       this.hide=false;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProducts(){
    this.subscription.add(
      this.prodService.getAllProducts().subscribe({
        next: (respuesta: Product[]) => {
          this.products = respuesta;            
        },
        error: () => {
          Swal.fire({
            title: 'Error al obtener la lista de Productos de la API',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    );
  }

  alterProduct(prod: Product){
    this.hide=true;
    this.selectProd = prod;
  }

  cancelar() {
    this.selectProd = {} as Product;
    this.hide=false;
    this.getProducts();
  }


}
