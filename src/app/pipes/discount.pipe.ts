import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: any, arg : any ):any {
    const discounts = [];
      if(value.length===0 || arg===''){
        return value;
      }
    
    
    for (const discount of value){
      if (discount.product?.name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        discounts.push(discount);

      }

    }
    return discounts;
  }

}
