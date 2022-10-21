import { NgModule } from '@angular/core';
import { LoginComponent } from './usuarios/login/login.component';
import { RouterModule, Routes } from '@angular/router';

import { RegistroUsuarioComponent } from './usuarios/registro-usuario/registro-usuario.component';
import { HomeComponent } from './home/home/home.component';
import { AbmOrderComponent } from './ventas/abm-order/abm-order.component';
import { ConsultaOrdenComponent } from './ventas/consulta-orden/consulta-orden.component';
import { BillOrderComponent } from './ventas/bill-order/bill-order.component';
import { MainComponent } from './home/main/main.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: MainComponent },
  { path: "register", component: RegistroUsuarioComponent },
  { path: "abm", component: AbmOrderComponent },
  { path: "consulta", component: ConsultaOrdenComponent },
  { path: "facturar", component: BillOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
