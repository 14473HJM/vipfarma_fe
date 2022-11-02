import { Component, OnInit, EventEmitter, Input,Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/services/customer.service';


@Component({
  selector: 'app-delete-customer',
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css']
})
export class DeleteCustomerComponent implements OnInit {

  @Input() id: number;
  @Output() onDelete = new EventEmitter();

  private subscription = new Subscription();

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete2(){
    const result: boolean = confirm('¿Desea eliminar el cliente?');
    if(result){
      this.subscription.add(
        this.customerService.delete(this.id).subscribe({
          next: () =>{
            this.onDelete.emit();
          },
          error: () => {
            alert('Error al borrar el cliente');
          },
        })
      );
    }
  }


}
