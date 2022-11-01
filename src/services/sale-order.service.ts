import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/interfaces/User';
import { Customer } from 'src/interfaces/Customer';
import { OrderItem } from 'src/interfaces/order-item';
import { OrderItemService } from './order-item.service';
import { SaleOrder } from 'src/interfaces/sale-order';



@Injectable({
  providedIn: 'root'
})
export class SaleOrderService {

  apiUrlBase: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private orderItemService: OrderItemService
  ) { }

  //[GET]/sale/orders/{id}
  getSaleOrderById(id: number): Observable<any> {
    return this.http.get(this.apiUrlBase + "/sale/orders/" + id);
  }

  //[PUT]/sale/orders/{id}

  //[PUT]/sale/orders/{id}/status/{status}
  changeSaleOrderStatus(id: number, saleOrderStatus: string): Observable<any> {
    const url = this.apiUrlBase + "/sale/orders/" + id + "/status/" + saleOrderStatus;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(saleOrderStatus);
    return this.http.put(url, body, { 'headers': headers })
  }

  //[GET]/sale/orders
  getSaleOrders(): Observable<SaleOrder[]> {
    return this.http.get<SaleOrder[]>(this.apiUrlBase + "/sale/orders")
  }

  //[POST]/sale/orders
  createSaleOrder(saleOrder: SaleOrder): Observable<any> {
    const url = this.apiUrlBase + "/sale/orders";
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(saleOrder);
    return this.http.post(url, body, { 'headers': headers })
  }

}
