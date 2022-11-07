import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStockProducts'
})
export class FilterProductsStockPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const stocks = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const stk of value){
      if (stk.stock.product.name.toLowerCase().indexOf(arg.toLowerCase())>-1 
            || (stk.stock.product.barcode).toString().indexOf(arg.toLowerCase())>-1
            || stk.stock.product.laboratory.toLowerCase().indexOf(arg.toLowerCase())>-1) {
              
              stocks.push(stk);
      }
    }
    
    return stocks;
  }

}
