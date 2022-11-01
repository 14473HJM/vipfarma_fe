import { NgModule } from '@angular/core';
import { LoginComponent } from './usuarios/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './usuarios/registro-usuario/registro-usuario.component';
import { HomeComponent } from './home/home/home.component';
import { ConsultaOrdenComponent } from './ventas/consulta-orden/consulta-orden.component';
import { CreateSaleOrderComponent } from './ventas/create-sale-order/create-sale-order.component';
import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: HomeComponent },
  { path: "register", component: RegistroUsuarioComponent },
  { path: "abm", component: CreateSaleOrderComponent },
  { path: "consulta", component: ConsultaOrdenComponent },
  { path: "cliente", component: CreateCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
