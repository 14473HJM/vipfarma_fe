import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    HomeComponent,
    CreateCustomerComponent,
    CreateSaleOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MdbModalModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
