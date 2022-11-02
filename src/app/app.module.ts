import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ListOfferComponent } from './reports/list-offer/list-offer.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ListDiscountComponent } from './reports/list-discount/list-discount.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { DespachoComponent } from './ventas/despacho/despacho.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    HomeComponent,
    CreateCustomerComponent,
    BillOrderComponent,
    MainComponent,
    ListOfferComponent,
    FilterPipe,
    ListDiscountComponent,
    DiscountPipe,
    DespachoComponent
    
<<<<<<< Updated upstream
  ],
=======
 ],
>>>>>>> Stashed changes
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
