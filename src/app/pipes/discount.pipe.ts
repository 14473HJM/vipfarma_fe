import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(value: any, arg : any, arg2: any ):any {
    const discounts = [];
      if(value.length===0 || arg==='' && arg2===''){
        return value;//list
      }
      if(arg!='' && arg2===''){
        for (const discount of value){
          if (discount.product?.name.toLowerCase().indexOf(arg.toLowerCase())>-1){
            discounts.push(discount);
    
          }
        }
      }
      else if(arg==='' && arg2!=''){
        for (const discount of value){
          if (discount.healthInsurancePlan?.name.toLowerCase()==(arg2.toLowerCase())){
            discounts.push(discount);
    
          }
        }
      }
      else if(arg!='' && arg2!=''){
        for (const discount of value){
          if (discount.healthInsurancePlan?.name.toLowerCase()==(arg2.toLowerCase()) && 
          discount.product?.name.toLowerCase().indexOf(arg.toLowerCase())>-1){
            discounts.push(discount);
    
          }
        }
      }
    
    
    
    return discounts;
  }

}
