import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './usuarios/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistroUsuarioComponent } from './usuarios/registro-usuario/registro-usuario.component';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './home/home/home.component';
import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';
import { BillOrderComponent } from './ventas/bill-order/bill-order.component';
import { MainComponent } from './home/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    HomeComponent,
    CreateCustomerComponent,
    BillOrderComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
