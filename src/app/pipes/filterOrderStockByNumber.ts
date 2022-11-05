import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOStockByNumber'
})
export class FilterOrderStockByNumberPipe implements PipeTransform {
  
  transform(value: any, arg : any ):any {

    const orders = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const order of value){
      if (order.purchaseOrderId.toString().toLowerCase().indexOf(arg.toLowerCase())>-1) {
        orders.push(order);
      }
    }
    
    return orders;
  }

}
