import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchOffice } from 'src/interfaces/BranchOffice';
import { User } from 'src/interfaces/User';
import { BranchOfficeService } from 'src/services/branch-office.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  branchs = {} as BranchOffice[];
  user = {} as User;
  pwd : string = "";

  constructor(private router:Router, private userServ: UserService,
    private branchServ : BranchOfficeService) { }

  ngOnInit(): void {
    this.branchServ.getAll().subscribe({
      next: (response : BranchOffice[]) => {
        this.branchs = response;
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == HttpStatusCode.InternalServerError) {
          alert("Error en el Servicio"); 
        }
      },
    })
  }

  registrar() {
    if(this.validateParams()) {
			this.userServ.postCreate(this.user).subscribe({
			  next: (response : User) => {
          this.user = response;
          this.userServ.setToken(this.user.id.toString(), this.user.userName, this.user.userRole, this.user.branchOffice.id.toString());
          this.router.navigate(['/']);
				},
			  error: (err: HttpErrorResponse) => {
          if(err.status == HttpStatusCode.InternalServerError) {
            alert("Error en el Servicio"); 
          }
			  },
			})
    }
  }

  validateParams() : boolean {
    if(this.user.userName != null && this.user.userName != "" &&
        this.user.password != null && this.user.password != "" &&
        this.user.email != null && this.user.email != "" && 
        this.user.branchOffice != null &&
        this.user.userRole != null && this.user.userRole != "" &&
        this.pwd != null && this.pwd != "") {

          if(this.pwd !== this.user.password) {
            alert('Los passwords deben ser iguales');
            return false;
          }
          return true;
    }
    alert('Ingrese todos los campos requeridos');
    return false;
  }

}
