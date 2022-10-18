import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SaleOrderService {
  
  apiUrlBase: string = environment.userBaseUrl;

  constructor(private http: HttpClient) { }

  getOffers(): Observable<any> {
    return this.http.get(this.apiUrlBase + "/offers");
  }

}
