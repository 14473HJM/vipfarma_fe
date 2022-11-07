import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Locker } from 'src/interfaces/Locker';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LockerService {

  apiLockerBaseUrl: string = environment.baseUrl + "/lockers";
  userServ: UserService;

  constructor(private http: HttpClient) { }

  getLockersAvailable(id: number, quant: number): Observable<Locker[]>{
    return this.http.get<Locker[]>
        (this.apiLockerBaseUrl + "?productId=" + id + "&availability=" + quant);
  }

  getLockersByBranch(id: any): Observable<Locker[]>{
    //var id = this.userServ.getBranchId();
    return this.http.get<Locker[]>(this.apiLockerBaseUrl + "?branchOfficeId=" + id);
  }

  getAllLockers(): Observable<Locker[]>{
    return this.http.get<Locker[]>(this.apiLockerBaseUrl);
  }
  
}
