import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Bill } from 'src/interfaces/Bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private apiUrlBase: string = environment.baseUrl + "/bills";

  constructor(private http: HttpClient) { }


  getBills(): Observable<Bill[]>{
    return this.http.get<Bill[]>(this.apiUrlBase + "/");
  }
}
