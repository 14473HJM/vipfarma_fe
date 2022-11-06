import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  @Input() id: number;
  @Output() onDelete = new EventEmitter();

  private subscription = new Subscription();
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete2() {
    
    Swal.fire({
      
      title: '¿Desea eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(this.id)
        this.subscription.add(
          this.productService.delete(this.id).subscribe({
            next: () => {
              Swal.fire({
                title: 'Producto eliminado correctamente',
                icon: 'success',
                confirmButtonText: "Ok",
              });
              this.onDelete.emit();
            },
            error: () => {
              Swal.fire({
                title: 'Error al eliminar el Producto',
                icon: 'error',
                confirmButtonText: "Ok",
              });
            },
          })
        )
      }
    });
  }

  
}
