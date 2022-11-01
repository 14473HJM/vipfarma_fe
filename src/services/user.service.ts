import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  apiUrlBase: string = environment.userBaseUrl;
  userMapping : string[] = ["SALES_CASHIER", "SALES_ADMIN", "SALES_SELLER"];

  constructor(private http: HttpClient, 
    private router: Router) { }

  postLogin(user: string, pass: string): Observable<any> {
    const comando = {
          "userName": user,
          "password": pass
    }
    const url = this.apiUrlBase + "/login";
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url, body, { 'headers': headers })
  }

  postCreate(user: User): Observable<any> {
    const comando = {
          "userName": user.userName,
          "password": user.password,
          "email": user.email,
          "userRole": user.userRole,
          "branchOffice": user.branchOffice
    }
    const url = this.apiUrlBase;
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(comando);

    return this.http.post(url, body, { 'headers': headers })
  }

  getUser(id: string): Observable<any> {
    return this.http.get(this.apiUrlBase + "/" + id);
  }

  /* TOKEN SERVICES */
  setToken(token: string, userName: string, rol: string, branch: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    localStorage.setItem("userRol", rol);
    localStorage.setItem("branch", branch);
  }

  getToken() : any {
    return localStorage.getItem("token");
  }

  getRol() : any {
    return localStorage.getItem("userRol");
  }

  getUserName() : any {
    return localStorage.getItem("userName");
  }

  getBranchId() : any {
    return localStorage.getItem("branch");
  }

  /* AUTHENTICATION SERVICES */
  authenticateUser(view: string) {
    let token = this.getToken();
    if(token != "" && token != null) {
      let rol = this.getRol();
      var viewRol = view.concat('_').concat(rol);
      if(this.userMapping.includes(viewRol)) {
        return true;
      }
      return false;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
