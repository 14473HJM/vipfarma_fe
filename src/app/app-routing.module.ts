import { NgModule } from '@angular/core';
import { LoginComponent } from './usuarios/login/login.component';
import { RouterModule, Routes } from '@angular/router';

import { RegistroUsuarioComponent } from './usuarios/registro-usuario/registro-usuario.component';
import { HomeComponent } from './home/home/home.component';
import { AbmOrderComponent } from './ventas/abm-order/abm-order.component';
import { ConsultaOrdenComponent } from './ventas/consulta-orden/consulta-orden.component';
import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';
import { ListCustomerComponent } from './Customer/list-customer/list-customer.component';
import { AlterCustomerComponent } from './Customer/alter-customer/alter-customer.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: HomeComponent },
  { path: "register", component: RegistroUsuarioComponent },
  { path: "abm", component: AbmOrderComponent },
  { path: "consulta", component: ConsultaOrdenComponent },
  { path: "customer", component: CreateCustomerComponent },
  { path: "listcustomer", component: ListCustomerComponent },
  { path: 'altercostumber/:id', component: AlterCustomerComponent  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
