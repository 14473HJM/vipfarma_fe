import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/interfaces/products';
import { ProductService } from 'src/services/product.service';


@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  messageName: string = '';
  messageCodebar: string = '';
  activo : boolean = false;
  activo1 : boolean = false;
  products: Product[]=[];

  constructor(private router:Router, private productService : ProductService) { }

  ngOnInit(): void {
    this.activo = true;
    this.activo1 = false;
  }

  activar(){
    if(this.activo){ 
      this.activo1=true;
      this.activo=false; 
    } 
      else{ 
        this.activo=true;
        this.activo1=false;
      }
  }

  activar1(){
    if(this.activo1){ 
      this.activo=true;
      this.activo1=false; 
    } 
      else{ 
        this.activo1=true;
        this.activo=false;
      }
  }


  searchProducts(){
    if(this.messageName!='')
      this.productService.getSearchedByName(this.messageName).subscribe({
        next: (products: Product[]) =>{
          console.log(products)
        },
        error: () =>{
          alert('error al obtener los productos')
        }
      });
    else {
      this.productService.getSearchedByCodebar (this.messageCodebar);
    }

  }

}
