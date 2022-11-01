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

  private apiUrlBase: string = environment.baseUrl;

  constructor(private http: HttpClient, private cookies: CookieService, 
    private router: Router) { }

    postCreate(name: string, lastName: string, dni: string, identification: string, address: string, id: number, plan: number): Observable<any> {
      const comando = {
        "name": name,
        "lastName": lastName,
        "identificationType": dni,
        "identification": identification,
        "address": address,
        "healthInsurance": id,
        "healthInsurancePlan": plan
       }
        const url = this.apiUrlBase;
        const headers = { 'content-type': 'application/json' };
        const body = JSON.stringify(comando);

      return this.http.post(url, body, { 'headers': headers })
    }

    getCustomers(): Observable<Customer[]>{
      return this.http.get<Customer[]>(this.apiUrlBase + "/customers");
    }

    getCustomer(id: number): Observable<any>{
      return this.http.get(this.apiUrlBase + "/customers/" + id);
    }



}
