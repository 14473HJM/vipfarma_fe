import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterInvoice'
})
export class FilterInvoice implements PipeTransform {
  
  transform(value: any, arg : any, arg2 : any ):any {

    const bills = [];
    if(value.length===0 || arg==='' || arg2==='' ){
        return value;
    }

    for(const bill of value){
    if (bill.Fecha.toLowerCase().indexOf(arg.toLowerCase())>-1 ){

        bills.push(bill);
    }

    }
    return bills;

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