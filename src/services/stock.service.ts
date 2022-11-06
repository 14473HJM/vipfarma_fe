import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StockSummary } from 'src/interfaces/StockSummary';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  apiBaseUrl: string = environment.baseUrl + "/stock/summary";

  constructor(private http: HttpClient, private userServ: UserService) { }

  getOrderSummaryByStatus(status: string): Observable<StockSummary[]> {
    let brOfId = this.userServ.getBranchId();
    return this.http.get<StockSummary[]>(this.apiBaseUrl + "?stockStatus=" + status);
  }
}
