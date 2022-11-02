import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './usuarios/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroUsuarioComponent } from './usuarios/registro-usuario/registro-usuario.component';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home/home.component';
import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateSaleOrderComponent } from './ventas/create-sale-order/create-sale-order.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { DeleteCustomerComponent } from './Customer/delete-customer/delete-customer.component';
import { AlterCustomerComponent } from './Customer/alter-customer/alter-customer.component';
import { ListCustomerComponent } from './Customer/list-customer/list-customer.component';
import { BillOrderComponent } from './ventas/bill-order/bill-order.component';
import { MainComponent } from './home/main/main.component';
import { ListOfferComponent } from './reports/list-offer/list-offer.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ListDiscountComponent } from './reports/list-discount/list-discount.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { DespachoComponent } from './ventas/despacho/despacho.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    HomeComponent,
    CreateCustomerComponent,
    CreateSaleOrderComponent,
    CreateSaleOrderComponent,
    DeleteCustomerComponent,
    AlterCustomerComponent,
    ListCustomerComponent,
    BillOrderComponent,
    MainComponent,
    ListOfferComponent,
    FilterPipe,
    ListDiscountComponent,
    DiscountPipe,
    DespachoComponent

 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MdbModalModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
