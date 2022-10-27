import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleOrder } from 'src/interfaces/sale-order';



@Injectable({
  providedIn: 'root'
})
export class SaleOrderService {
  
  apiUrlBase: string = environment.userBaseUrl;
  apiUrlSaleOrder: string = environment.saleOrderBaseUrl;

  constructor(private http: HttpClient) { }

  getOffers(): Observable<any> {
    return this.http.get(this.apiUrlBase + "/offers");
  }

  getSaleOrdersReadyToBill(branchId: number): Observable<any> {
    return this.http.get(this.apiUrlSaleOrder + "?saleOrderStatus=READY_TO_BILL&branchOfficeId=" + branchId);
  }

  getSaleOrdersBilled(branchId: number): Observable<any> {
    return this.http.get(this.apiUrlSaleOrder + "?saleOrderStatus=BILLED&branchOfficeId=" + branchId);
  }

}
