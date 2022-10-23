import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  viewName : string = "HOME";
  user = {} as User;
  isFacturar : boolean = false;
  isHome : boolean = true;
  refreshListOffer: boolean = false;
  refreshListDiscount: boolean=false;

  constructor(private router: Router, private userServ: UserService) { }

  ngOnInit(): void {
    this.userServ.authenticateUser(this.viewName);
    this.setUserLogged();
  }

  logOut() {
    this.userServ.setToken("", "", "");
    this.router.navigate(['login']);
  }

  setUserLogged() {
    this.user.userName = this.userServ.getUserName();
    this.user.userRole = this.userServ.getRol();
  }

  cleanFlags() {
    this.isHome = false;
    this.isFacturar = false;
  }

  facturar() {
    this.cleanFlags();
    this.isFacturar = true;
    this.refreshListOffer =false;
  }

  listOffer(){
    this.isHome = false;
    this.refreshListOffer =true;
    this.isFacturar = false;
    this.refreshListDiscount=false;
  }

  listDiscount(){
    this.isHome = false;
    this.refreshListOffer =false;
    this.isFacturar = false;
    this.refreshListDiscount=true;
  }

  home() {
    this.cleanFlags();
    this.isHome = true;
  }

}
