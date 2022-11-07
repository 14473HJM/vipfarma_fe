import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OfferStock } from 'src/interfaces/OfferStock';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrlBase: string = environment.baseUrl + "/stocks/offers";
  private apiUrlBaseParaUno: string = environment.baseUrl + "/stock/offer";


  constructor(private http: HttpClient, private userServ: UserService) { }

  getOffer(): Observable<OfferStock[]> {
    return this.http.get<OfferStock[]>(this.apiUrlBase);
  }

  getOfferByProduct(idProd: number, idPlan: number): Observable<OfferStock> {
    let branch = this.userServ.getBranchId();
    return this.http.get<OfferStock>(this.apiUrlBaseParaUno + "?branchOfficeId=" + branch + "&productId=" + idProd + "&planId=" + idPlan);
  }

}
