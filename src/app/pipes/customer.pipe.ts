import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customers'
})
export class CustomerPipe implements PipeTransform {

  transform(value: any, arg: any, arg2: any): any {  
    const listado = [];
       if(value.length===0 || arg===''&& arg2===''){
      return value;
    } 




    if(arg!='' && arg2===''){
      for (const customers of value){
        if (customers.identification?.toLowerCase().indexOf(arg.toLowerCase())>-1){
          listado.push(customers);
  
        }

    }

    }

    if(arg2!='' && arg===''){

      for (const customers of value){
        if (customers.name?.toLowerCase().indexOf(arg2.toLowerCase())>-1 || 
        customers.lastName?.toLowerCase().indexOf(arg2.toLowerCase())>-1){
          listado.push(customers);
  
        }

    }
    } 
    if(arg2!='' && arg!=''){

      for (const customers of value){
        if (customers.name?.toLowerCase().indexOf(arg2.toLowerCase())>-1 || 
        customers.lastName?.toLowerCase().indexOf(arg2.toLowerCase())>-1 && customers.identification?.toLowerCase().indexOf(arg.toLowerCase())>-1){
          listado.push(customers);
  
        }

    }
    } 


    return listado;


  }

}
