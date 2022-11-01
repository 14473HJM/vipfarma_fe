import { Pipe, PipeTransform } from '@angular/core';
import { OfferStock } from 'src/interfaces/OfferStock';
import { OfferService } from 'src/services/offer.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  

  transform(value: any, arg : any ):any {

      const offers = [];
      if(value.length===0 || arg===''){
        return value;
      }
    
    
    for (const offer of value){
      if (offer.product?.name.toLowerCase().indexOf(arg.toLowerCase())>-1){
        offers.push(offer);

      }

    }
    return offers;
  }

}
