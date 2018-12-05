import { Component, OnInit } from '@angular/core';
import { BananaComponent } from '../objects/banana/banana.component'
import { BuildingComponent } from '../objects/building/building.component'
import { GorillaComponent } from '../objects/gorilla/gorilla.component'
import { ShapeComponent } from '../objects/shape/shape.component'
import { SunComponent } from '../objects/sun/sun.component'
import { WindComponent } from '../objects/wind/wind.component'
import { GorillaService } from '../gorilla.service'

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public service: GorillaService
  ) { }

  ngOnInit() {
  }

}
