import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BranchOffice } from 'src/interfaces/BranchOffice';

@Injectable({
  providedIn: 'root'
})
export class BranchOfficeService {

  private apiUrlBase: string = environment.baseUrl + "/branchOffice";

  constructor(private http: HttpClient) {}

  getAll(): Observable<BranchOffice[]> {
    return this.http.get<BranchOffice[]>(this.apiUrlBase);
  }
}
