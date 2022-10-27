import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  apiUrlBase: string = environment.billBaseUrl;

  constructor(private http: HttpClient, private userServ : UserService) { }

  billOrder(id: number): Observable<any> {
    let idUser = this.userServ.getToken();
    const comando = {
      "id": idUser
    }
    return this.http.post(this.apiUrlBase + "/" + id, comando);
  }

}
