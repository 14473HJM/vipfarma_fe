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
import { BillOrderComponent } from './ventas/bill-order/bill-order.component';
import { MainComponent } from './home/main/main.component';
import { ListOfferComponent } from './reports/list-offer/list-offer.component';
import { ListDiscountComponent } from './reports/list-discount/list-discount.component';


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: MainComponent },
  { path: "register", component: RegistroUsuarioComponent },
  { path: "abm", component: AbmOrderComponent },
  { path: "consulta", component: ConsultaOrdenComponent },

  { path: "customer", component: CreateCustomerComponent },
  { path: "listcustomer", component: ListCustomerComponent },
  { path: 'altercostumber/:id', component: AlterCustomerComponent  },
  { path: "facturar", component: BillOrderComponent },
  { path: "reportes/list-offer", component: ListOfferComponent},
  { path: "reportes/list-discount", component: ListDiscountComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
