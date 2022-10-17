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
import { ListOfferComponent } from './list-offer/list-offer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    HomeComponent,
    ListOfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
