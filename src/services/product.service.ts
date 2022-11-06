import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'src/interfaces/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrlBase: string = environment.uploadProductsBaseUrl;;

  constructor(private http: HttpClient, private cookies: CookieService, 
    private router: Router) { }

  getSearchedByName(name : string) : Observable<any> {
    const url = this.apiUrlBase + "?name="+ name;
    const headers = { 'content-type': 'application/json' };
  
    return this.http.get(url, { 'headers': headers })
  }

  getSearchedByCodebar(barcode : string) : Observable<any>{
    const url = this.apiUrlBase + "/?barcode="+ barcode;
    const headers = { 'content-type': 'application/json' };
  
    return this.http.get(url, { 'headers': headers })
  }

  getProduct(id: string): Observable<any>{
    return this.http.get(this.apiUrlBase + "/"+ id);
  }

  postCreateProducts(product: Product): Observable<any>{
    const url = this.apiUrlBase;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(product);

    return this.http.post(url, body, { 'headers': headers })
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrlBase);
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.apiUrlBase + "/"+ id);
  }



}
