import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OfferStock } from 'src/interfaces/OfferStock';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrlBase: string = environment.baseUrl + "/stocks/offers";
  filterProducts='';

  constructor(private http: HttpClient) {}

  getOffer(): Observable<OfferStock[]> {
    return this.http.get<OfferStock[]>(this.apiUrlBase);
  }
  
}
