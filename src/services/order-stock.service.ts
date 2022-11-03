import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderStockService {

  apiUrlOrderStock: string = environment.orderStockBaseUrl;

  constructor(private http: HttpClient) { }

  getSaleOrderPendingDelivery(): Observable<any> {
    return this.http.get(this.apiUrlOrderStock + "?status=PENDING_DELIVERY");
  }

}
