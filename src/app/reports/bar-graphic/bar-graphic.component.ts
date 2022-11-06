import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-graphic',
  templateUrl: './bar-graphic.component.html',
  styleUrls: ['./bar-graphic.component.css']
})
export class BarGraphicComponent implements OnInit {

  datos: CharacterData
  constructor() { }

  ngOnInit(): void {
  }

}
