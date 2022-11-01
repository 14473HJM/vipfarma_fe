import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SaleOrder } from 'src/interfaces/sale-order';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class SaleOrderService {
  
  apiUrlBase: string = environment.userBaseUrl;
  apiUrlSaleOrder: string = environment.saleOrderBaseUrl;

  constructor(private http: HttpClient, private userServ: UserService) { }

  getOffers(): Observable<any> {
    return this.http.get(this.apiUrlBase + "/offers");
  }

  getOrderById(id : number): Observable<any> {
    return this.http.get(this.apiUrlSaleOrder + "/" + id);
  }

  getSaleOrdersReadyToBill(): Observable<any> {
    let branchId = this.userServ.getBranchId();
    return this.http.get(this.apiUrlSaleOrder + "?saleOrderStatus=READY_TO_BILL&branchOfficeId=" + branchId);
  }

  getSaleOrdersBilled(branchId: number): Observable<any> {
    return this.http.get(this.apiUrlSaleOrder + "?saleOrderStatus=BILLED&branchOfficeId=" + branchId);
  }

  changeStatus(id: number, status: string): Observable<any> {
    return this.http.put(this.apiUrlSaleOrder + "/" + id + "/status/" + status, null);
  }

}
