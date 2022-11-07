import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterInvoice'
})
export class FilterInvoice implements PipeTransform {
  
  transform(value: any, arg : any, arg2 : any ):any {

/*     const orders = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const order of value){
      if (order.lastName.toLowerCase().indexOf(arg.toLowerCase())>-1 
            || order.name.toLowerCase().indexOf(arg.toLowerCase())>-1
            || order.identification.toLowerCase().indexOf(arg.toLowerCase())>-1) {
        orders.push(order);
      }
    }
    
    return orders; */
  }

}