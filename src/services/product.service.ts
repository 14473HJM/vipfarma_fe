import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'src/interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrlBase: string = "http://localhost:8080";

  constructor(private http: HttpClient, private cookies: CookieService, 
    private router: Router) { }

  getSearchedByName(name : string) : Observable<any> {
    const url = this.apiUrlBase + "/products" + "?name="+ name;
    const headers = { 'content-type': 'application/json' };
  
    return this.http.get(url, { 'headers': headers })
  }

  getSearchedByCodebar(barcode : string) : Observable<any>{
    const url = this.apiUrlBase + "/products" + "?barcode="+ barcode;
    const headers = { 'content-type': 'application/json' };
  
    return this.http.get(url, { 'headers': headers })
  }

  postCreateProducts(product: Product): Observable<any>{
    const url = this.apiUrlBase + "/products";
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(product);

    return this.http.post(url, body, { 'headers': headers })
  }
}
