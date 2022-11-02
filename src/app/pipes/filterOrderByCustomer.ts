import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOrderByCustomer'
})
export class FilterOrderByCustPipe implements PipeTransform {
  
  transform(value: any, arg : any ):any {

    const orders = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const order of value){
      if (order.customer.lastName.toLowerCase().indexOf(arg.toLowerCase())>-1 
            || order.customer.name.toLowerCase().indexOf(arg.toLowerCase())>-1) {
        orders.push(order);
      }
    }
    
    return orders;
  }

}
