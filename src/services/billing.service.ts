import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bill } from 'src/interfaces/Bill';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  apiUrlBase: string = environment.baseUrl + "/billing/order";

  constructor(private http: HttpClient, private userServ : UserService) { }

  billOrder(id: number, preview: boolean): Observable<Bill> {
    let idUser = this.userServ.getToken();
    const comando = {
      "id": idUser
    }
    return this.http.post<Bill>(this.apiUrlBase + "/" + id + "?preview=" + preview, comando);
  }

}
