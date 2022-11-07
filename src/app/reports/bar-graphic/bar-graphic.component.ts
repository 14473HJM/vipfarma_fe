import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Subscription } from 'rxjs';
import { Locker } from 'src/interfaces/Locker';
import { LockerService } from 'src/services/locker.service';
import { UserService } from 'src/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bar-graphic',
  templateUrl: './bar-graphic.component.html',
  styleUrls: ['./bar-graphic.component.css']
})
export class BarGraphicComponent implements OnInit, OnDestroy {

  labelLockers: Locker[];
  labels: String[];
  idLocker:number;
  idUser: any;

  private subscription = new Subscription();
  
  // datos: ChartData<'bar', number[], string> = {
  //   labels: ['Locker1', 'Locker2', 'Locker3'],
  //   datasets: [
      
  //     {
  //       data: [80, 100, 90, 40],
  //       label: 'Disponible'
  //     },
  //     {
  //       data: [20, 0, 10, 60],
  //       label: 'Ocupado'
  //     }

  //   ]
  // }


  // con service

  datos: ChartData<'bar'>


  constructor( private lockerServ: LockerService, private userServ: UserService) {
    
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
   this.idUser = this.userServ.getBranchId();
   console.log(this.idUser)
    this.subscription.add(
      this.lockerServ.getLockersByBranch(this.idUser).subscribe({
        next: (respuesta: Locker[]) => {
          console.log(respuesta)
          this.datos={
            labels: respuesta.map((x)=> x.id),
            datasets: [
              {
                data: respuesta.map((x)=> x.occupiedCapacity),
                label: 'Capacidad ocupada', stack: 'a'
              },
              {
                data: respuesta.map((x)=> x.stockCapacity-x.occupiedCapacity),
                label: 'Capacidad disponible', stack: 'a'
              }

            ]
          }
        },
        error: () => {
          Swal.fire({
            title: 'Error al cargar gráfico',
            icon: 'error',
            confirmButtonText: "Ok",
          });
        },
      })
    )
  }

  
}
