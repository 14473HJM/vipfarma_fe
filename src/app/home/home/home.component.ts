import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  viewName : string = "HOME";
  user = {} as User;
  userActive : boolean = false;

  constructor(private router: Router, private userServ: UserService) {
    
  }

  ngOnInit() {
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

}
