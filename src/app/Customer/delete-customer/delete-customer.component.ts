import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/services/customer.service';
import Swal from 'sweetalert2';


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

  onDelete2() {
    Swal.fire({
      title: '¿Desea eliminar el cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.customerService.delete(this.id).subscribe({
            next: () => {
              Swal.fire({
                title: 'Cliente borrado correctamente',
                icon: 'success',
                confirmButtonText: "Ok",
              });
              this.onDelete.emit();
            },
            error: () => {
              Swal.fire({
                title: 'Error al borrar el cliente',
                icon: 'error',
                confirmButtonText: "Ok",
              });
            },
          })
        )
      }
    });
  }

  // onDelete2(){
  //   const result: boolean = confirm('¿Desea eliminar el cliente?');
  //   if(result){
  //     this.subscription.add(
  //       this.customerService.delete(this.id).subscribe({
  //         next: () =>{
  //           this.onDelete.emit();
  //         },
  //         error: () => {
  //           Swal.fire({
  //             title: 'Error al borrar el cliente',
  //             icon: 'error',
  //             confirmButtonText: "Ok",
  //           });
  //         },
  //       })
  //     );
  //   }
  // }


}
