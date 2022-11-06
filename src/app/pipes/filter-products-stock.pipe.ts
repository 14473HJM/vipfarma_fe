import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStockProducts'
})
export class FilterProductsStockPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const products = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const s of value){
      if (s.stock.product.name.toLowerCase().indexOf(arg.toLowerCase())>-1 
            || (s.stock.product.barcode).toString().indexOf(arg.toLowerCase())>-1
            || s.stock.product.laboratory.toLowerCase().indexOf(arg.toLowerCase())>-1) {
              
              products.push(s);
      }
    }
    
    return products;
  }

}
