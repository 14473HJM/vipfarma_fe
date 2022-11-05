import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockOrder } from 'src/interfaces/StockOrder';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderStockService {

  apiUrlOrderStock: string = environment.orderStockBaseUrl;

  constructor(private http: HttpClient, private userServ: UserService) { }

  getSaleOrderPendingDelivery(): Observable<any> {
    let brOfId = this.userServ.getBranchId();
    return this.http.get(this.apiUrlOrderStock + "?stockOrderStatus=PENDING_DELIVERY&warehouseId=" + brOfId);
  }

  getSaleOrderReceived(): Observable<any> {
    let brOfId = this.userServ.getBranchId();
    return this.http.get(this.apiUrlOrderStock + "?stockOrderStatus=RECEIVED&warehouseId=" + brOfId);
  }

  putStatusOrderStockCancelled(id: number, status: string): Observable<any> {
    return this.http.put(this.apiUrlOrderStock + "/" + id + "/status/" + status, null);
  }

  putStatusOrderStock(status: string, order: StockOrder): Observable<any> {
    return this.http.put(this.apiUrlOrderStock + "/" + order.id + "/status/" + status, order);
  }

}
