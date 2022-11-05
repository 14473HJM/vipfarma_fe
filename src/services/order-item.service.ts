import { Injectable } from '@angular/core';
import { OrderItem } from 'src/interfaces/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  orderItems: OrderItem[] = [];

  constructor() { }

  addOrderItems(nuevo: OrderItem) {
    this.orderItems.push(nuevo)
  }


}
