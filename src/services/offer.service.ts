import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OfferStock } from 'src/interfaces/OfferStock';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrlBase: string = environment.baseUrl + "/stock/offer";
  filterProducts = '';

  constructor(private http: HttpClient) { }

  getOffer(): Observable<OfferStock[]> {
    return this.http.get<OfferStock[]>(this.apiUrlBase);
  }

  getOfferByProduct(idProd: number, idPlan: number): Observable<OfferStock> {
    let branch = 1001;
    //let branch= llamada a localStorage
    return this.http.get<OfferStock>(this.apiUrlBase + "?branchOfficeId=" + branch + "&productId=" + idProd + "&planId=" + idPlan);
  }

}
