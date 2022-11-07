import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerP'
})
export class CustomerPipe implements PipeTransform {
  

  

  transform(value: any, arg: any): any {
    const customers = [];
    if (value.length === 0 || arg === '') {
      return value;
    }

    for (const customer of value) {
      if (
        customer.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
        customer.identification.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        customers.push(customer);
      }
    }
    return customers;
  }
}
