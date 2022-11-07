import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(value: any, arg : any ):any {

    const products = [];
    if(value.length===0 || arg===''){
        return value;
    }
    
    for (const product of value){
      if (product.name.toLowerCase().indexOf(arg.toLowerCase())>-1 
            //|| product.barcode==arg.
            || (product.barcode).toString().indexOf(arg.toLowerCase())>-1
            || product.laboratory.toLowerCase().indexOf(arg.toLowerCase())>-1) {
              products.push(product);
      }
    }
    
    return products;
  }

}
