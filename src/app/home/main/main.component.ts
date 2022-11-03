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
  isDespacho: boolean = false;
  isVerClientes: boolean = false;
  isRecibirStock: boolean = false;

  constructor(private router: Router, private userServ: UserService) { }

  ngOnInit(): void {
    this.userServ.authenticateUser(this.viewName);
    this.setUserLogged();
  }

  logOut() {
    const result: boolean = confirm(
      'Esta seguro que quiere Cerrar Sesión ??'
    );
    if(result) {
      this.userServ.setToken("", "", "", "");
      this.router.navigate(['login']);
    }
  }

  setUserLogged() {
    this.user.userName = this.userServ.getUserName();
    this.user.userRole = this.userServ.getRol();
  }

  cleanFlags() {
    this.isHome = false;
    this.isFacturar = false;
    this.refreshListDiscount = false;
    this.refreshListOffer = false;
    this.isDespacho = false;
    this.isVerClientes = false;
    this.isRecibirStock = false;
  }

  facturar() {
    this.cleanFlags();
    this.isFacturar = true;
    this.refreshListOffer =false;
  }

  listOffer(){
    this.cleanFlags();
    this.refreshListOffer =true;
  }

  listDiscount(){
    this.cleanFlags();
    this.refreshListDiscount=true;
  }

  home() {
    this.cleanFlags();
    this.isHome = true;
  }

  despacho() {
    this.cleanFlags();
    this.isDespacho = true;
  }

  verClientes() {
    this.cleanFlags();
    this.isVerClientes = true;
  }

  recibirStock() {
    this.cleanFlags();
    this.isRecibirStock = true;
  }

}
