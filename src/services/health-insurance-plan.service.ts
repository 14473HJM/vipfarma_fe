import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { healthInsurancePlan } from 'src/interfaces/healthInsurancePlan';


@Injectable({
  providedIn: 'root'
})
export class HealthInsurancePlanService {
  
  private apiUrlBase: string = environment.healthInsurancePlanBaseUrl;

  constructor(private http: HttpClient, private router: Router) { }

  gethealthInsurancePlans(): Observable<healthInsurancePlan[]>{
    return this.http.get<healthInsurancePlan[]>(this.apiUrlBase);
  }

  gethealthInsurancePlan(id: number): Observable<healthInsurancePlan[]>{
    return this.http.get<healthInsurancePlan[]>(this.apiUrlBase + id);
  }

}
