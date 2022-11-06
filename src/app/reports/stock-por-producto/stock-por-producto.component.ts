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

  totalReservado: number = 25;
  totalInactivo: number = 36;
  totalExpirado: number = 113;
  totalDisponible: number = 1500;
  porcDisponible: number = 62;
  porcReservado: number = 3;
  porcInactivo: number = 5;
  porcExpirado: number = 20;
  
  public page: number;
  filterProduct: string;
  isSearchAll: boolean = false;

  stockProductList = {} as StockSummary[];

  constructor(private stockServ: StockService) { }

  ngOnInit(): void {
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

}
