import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  apiUrlBase: string = environment.billBaseUrl;

  constructor(private http: HttpClient) { }

  billOrder(id: number): Observable<any> {
    return this.http.post(this.apiUrlBase + "/" + id, null);
  }

}
