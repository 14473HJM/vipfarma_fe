import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { healthInsurance } from 'src/interfaces/healthInsurance';


@Injectable({
  providedIn: 'root'
})
export class HealthInsuranceService {

  private apiUrlBase: string = environment.healthInsuranceBaseUrl;
  constructor(private http: HttpClient, private router: Router) { }

  gethealthInsurance(): Observable<healthInsurance[]>{
    return this.http.get<healthInsurance[]>(this.apiUrlBase);
  }

  
}
