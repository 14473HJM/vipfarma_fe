import { Component, OnInit } from '@angular/core';
import { StockSummary } from 'src/interfaces/StockSummary';
import { StockService } from 'src/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-por-producto',
  templateUrl: './stock-por-producto.component.html',
  styleUrls: ['./stock-por-producto.component.css']
})
export class StockPorProductoComponent implements OnInit {

  totalReservado: number = 0;
  totalInactivo: number = 0;
  totalExpirado: number = 0;
  totalDisponible: number = 0;
  porcDisponible: number = 0;
  porcReservado: number = 0;
  porcInactivo: number = 0;
  porcExpirado: number = 0;
  
  public page: number;
  filterProduct: string = '';
  isOneProduct: boolean = false;

  stockProductList = {} as StockSummary[];
  summaries = {} as StockSummary[];

  constructor(private stockServ: StockService) { }

  ngOnInit(): void {
    this.cleanValues();
    this.refreshProducts(); 
    this.completarDatosCards();
  }

  cleanValues() {
    this.totalReservado = 0;
    this.totalInactivo = 0;
    this.totalExpirado = 0;
    this.totalDisponible = 0;
    this.porcDisponible = 0;
    this.porcReservado = 0;
    this.porcInactivo = 0;
    this.porcExpirado = 0;
  }

  refreshProducts() {
    this.stockServ.getOrderSummaryByStatus("ACTIVE").subscribe({
      next: (respuesta: StockSummary[]) => {
        this.stockProductList = respuesta;            
      },
      error: () => {
        Swal.fire({
          title: 'Error al obtener la lista de Productos',
          icon: 'error',
          confirmButtonText: "Ok",
        });
      },
    })
  }

  completarDatosCards() {
    this.stockServ.getOrderSummaries().subscribe({
      next: (respuesta: StockSummary[]) => {
        this.summaries = respuesta;
        this.completarDatos();        
      },
      error: () => {
        Swal.fire({
          title: 'Error al obtener Información de Stock',
          icon: 'error',
          confirmButtonText: "Ok",
        });
      },
    })
  }

  completarDatos() {
    for(let sum of this.summaries) {
      if(sum.stock.stockStatus == "ACTIVE") {
        this.totalDisponible = sum.value;
      } else if(sum.stock.stockStatus == "EXPIRED") {
        this.totalExpirado = sum.value;
      } else if(sum.stock.stockStatus == "INACTIVE") {
        this.totalInactivo = sum.value;
      } else if(sum.stock.stockStatus == "RESERVED") {
        this.totalReservado = sum.value;
      }
    }

    var total = this.totalDisponible + this.totalExpirado + this.totalInactivo + this.totalReservado;

    this.porcDisponible = (this.totalDisponible * 100) / total;
    this.porcExpirado = (this.totalExpirado * 100) / total;
    this.porcReservado = (this.totalReservado * 100) / total;
    this.porcInactivo = (this.totalInactivo * 100) / total;

    this.porcDisponible = Number(this.porcDisponible.toFixed(2));
    this.porcExpirado = Number(this.porcExpirado.toFixed(2));
    this.porcReservado = Number(this.porcReservado.toFixed(2));
    this.porcInactivo = Number(this.porcInactivo.toFixed(2));
  }

}
