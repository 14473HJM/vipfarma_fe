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
    const url = this.apiUrlBase + "/products";
    const headers = { 'content-type': name };
  
    return this.http.get(url, { 'headers': headers })
  }

  getSearchedByCodebar(codebar : string) : Observable<any>{
    const url = this.apiUrlBase + "/products";
    const headers = { 'content-type': codebar };
  
    return this.http.get(url, { 'headers': headers })
  }
}
