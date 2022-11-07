import { NgModule } from '@angular/core';
import { LoginComponent } from './usuarios/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './usuarios/registro-usuario/registro-usuario.component';
import { HomeComponent } from './home/home/home.component';
import { ConsultaOrdenComponent } from './ventas/consulta-orden/consulta-orden.component';
import { CreateCustomerComponent } from './Customer/create-customer/create-customer.component';
import { ListCustomerComponent } from './Customer/list-customer/list-customer.component';
import { AlterCustomerComponent } from './Customer/alter-customer/alter-customer.component';
import { BillOrderComponent } from './ventas/bill-order/bill-order.component';
import { MainComponent } from './home/main/main.component';
import { ListOfferComponent } from './reports/list-offer/list-offer.component';
import { ListDiscountComponent } from './reports/list-discount/list-discount.component';
import { CreateSaleOrderComponent } from './ventas/create-sale-order/create-sale-order.component';
import { SearchProductsComponent } from './products/search-products/search-products.component';
import { UploadProductsComponent } from './products/upload-products/upload-products.component';
import { ListProductsComponent } from './products/list-products/list-products.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { StockPorProductoComponent } from './reports/stock-por-producto/stock-por-producto.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: MainComponent },
  { path: "register", component: RegistroUsuarioComponent },
  { path: "abm", component: CreateSaleOrderComponent },
  { path: "consulta", component: ConsultaOrdenComponent },
  { path: "customer", component: CreateCustomerComponent },
  { path: "listcustomer", component: ListCustomerComponent },
  { path: 'altercostumber/:id', component: AlterCustomerComponent  },
  { path: "facturar", component: BillOrderComponent },
  { path: "reportes/list-offer", component: ListOfferComponent},
  { path: "products/list-products", component: ListProductsComponent},
  { path: "reportes/list-discount", component: ListDiscountComponent},
  { path: "searchProd", component: SearchProductsComponent },
  { path: "deleteProd", component: DeleteProductComponent},
  { path: "uploadProd", component: UploadProductsComponent},
  { path: "stock", component: StockPorProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
