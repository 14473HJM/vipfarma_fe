import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/interfaces/User';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';

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
          this.userServ.setToken(this.user.id.toString(), this.user.userName, 
                this.user.userRole, this.user.branchOffice.id.toString());
          this.router.navigate(['/']);
				},
			  error: (err: HttpErrorResponse) => {
          if(err.status == HttpStatusCode.NotFound) {
            Swal.fire({
              title: 'Usuario y/o contrasena incorrecta',
              icon: 'error',
              confirmButtonText: "Ok",
            });
          }
          if(err.status == HttpStatusCode.InternalServerError) {
            Swal.fire({
              title: 'Error en el Servicio',
              icon: 'error',
              confirmButtonText: "Ok",
          });
          }
			  },
			})
    } else {
      Swal.fire({
        title: 'Ingrese nombre de usuario y contraseña',
        icon: 'error',
        confirmButtonText: "Ok",
      });
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
