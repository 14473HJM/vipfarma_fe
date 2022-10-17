import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {

  user = {} as User;

  constructor(private router:Router, private userServ: UserService) { }

  ngOnInit(): void {
  }

  login() {
    if(this.validateParams()) {
			this.userServ.postLogin(this.user.userName, this.user.password).subscribe({
			  next: (response : User) => {
          this.user = response;
          this.userServ.setToken(this.user.id.toString(), this.user.userName, this.user.userRole);
          this.router.navigate(['/']);
				},
			  error: (err: HttpErrorResponse) => {
          if(err.status == HttpStatusCode.NotFound) {
            alert('Usuario y/o contrasena incorrecta');
          }
          if(err.status == HttpStatusCode.InternalServerError) {
            alert("Error en el Servicio"); 
          }
			  },
			})
    } else {
      alert('Ingrese nombre de usuario y contraseña');
    }
  }

  validateParams() : boolean {
    if(this.user.userName != null && this.user.userName != "" &&
        this.user.password != null && this.user.password != "") {
          return true;
    }
    return false;
  }

}
