import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OfferStock } from 'src/interfaces/OfferStock';


@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private API_URL: string = `http://localhost:8080/offers`;

  

  constructor(private http: HttpClient) {}

  getOffer(): Observable<OfferStock[]> {
    return this.http.get<OfferStock[]>(this.API_URL);
  }
  
}
