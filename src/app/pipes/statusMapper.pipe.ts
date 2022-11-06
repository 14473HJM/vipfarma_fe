import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe'
})
export class StatusMapperPipe implements PipeTransform {

  transform(value: any): any {

    switch (value) {
      case "CREATED":
        return "CREADA";
        break;
      case "PENDING_DELIVERY":
        return "PENDIENTE";
        break;
      case "STORED":
        return "ALMACENADA";
        break;
      case "RECEIVED":
        return "RECIBIDA"
        break;
      case "REJECTED":
        return "DEVUELTA";
        break;
      case "CANCELED":
        return "CANCELADA";
        break;
      case "NO_RECEIVED":
        return "NO RECIBIDA"
        break;
      case "PARTIALLY_RECEIVED":
        return "RECIBIDO PARCIAL"
        break;
      case "COMPLETELY_RECEIVED":
        return "RECIBIDO TOTAL"
        break;
      default:
        return value;
        break;
    }  
  }

}
