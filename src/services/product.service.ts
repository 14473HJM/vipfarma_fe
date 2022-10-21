import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

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
}
