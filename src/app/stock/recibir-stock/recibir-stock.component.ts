import { Component, OnInit } from '@angular/core';
import { StockOrder } from 'src/interfaces/StockOrder';
import { OrderStockService } from 'src/services/order-stock.service';

@Component({
  selector: 'app-recibir-stock',
  templateUrl: './recibir-stock.component.html',
  styleUrls: ['./recibir-stock.component.css']
})
export class RecibirStockComponent implements OnInit {

  stockOrders = {} as StockOrder[];
  selectedOrder = {} as StockOrder;

  constructor(private orderStServ: OrderStockService) { }

  ngOnInit(): void {
  }

  onSelectionChange(order: StockOrder) {
    this.selectedOrder = order;
  }

  onDelete() {

  }

}
