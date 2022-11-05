import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Laboratory } from "src/interfaces/Laboratory";




@Injectable({
    providedIn: 'root'
  })
  export class LaboratoryService {

    private lab: Laboratory[]=[
        {nombre: 'Andrómaco'},
        {nombre: 'Bagó'},
        {nombre: 'Baliarda'},
        {nombre: 'Casasco'},
        {nombre: 'Elea'},
        {nombre: 'Gador'},
        {nombre: 'Investi'},
        {nombre: 'Roemmers'}
    ]

    constructor(){

    }
    getLaboratories(): Laboratory[] {
        return this.lab;
    }

  }
  