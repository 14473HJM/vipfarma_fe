import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Locker } from 'src/interfaces/Locker';

@Injectable({
  providedIn: 'root'
})
export class LockerService {

  apiLockerBaseUrl: string = environment.baseUrl + "/lockers";

  constructor(private http: HttpClient) { }

  getLockersAvailable(id: number, quant: number): Observable<Locker[]>{
    return this.http.get<Locker[]>
        (this.apiLockerBaseUrl + "?productId=" + id + "&availability=" + quant);
  }
}
