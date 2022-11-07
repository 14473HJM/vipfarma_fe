import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'FilterInvoice'
})
export class FilterInvoice implements PipeTransform {

  
  transform(value: any, arg : any, arg2 : any ):any {

 

    
    const bills = [];
    if(value.length===0 || arg==null || arg2==null ){
        return value;
    }

    for(const bill of value){
 
      if(bill.createdDate>=arg && bill.createdDate<=arg2){
        bills.push(bill);
        console.log(bill.createdDate)
        console.log(arg)
        console.log(arg2)
      }

    }
    return bills;
  }

}