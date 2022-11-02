import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Customer } from 'src/interfaces/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  //customer: Customer= {} as Customer;

  private apiUrlBase: string = environment.customerBaseUrl;

  constructor(private http: HttpClient, private cookies: CookieService, 
    private router: Router) { }

    postCreate(customer: Customer): Observable<any> {
        const url = this.apiUrlBase;
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(customer);

      return this.http.post(url, body, { 'headers': headers })
    }

    getCustomers(): Observable<Customer[]>{
      return this.http.get<Customer[]>(this.apiUrlBase + "/");
    }

    getCustomer(id: string): Observable<any>{
      return this.http.get(this.apiUrlBase + "/" + id);
    }

    delete(id: number): Observable<any>{
      return this.http.delete(this.apiUrlBase + "/" + id);
    }

}
