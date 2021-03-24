import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  car={
    carId:1,
    brandId:1,
    colorId :2,
    modelYear:"5",
    dailyPrice:15,
    descriptions:"deneme",
  };
  cars=[this.car]
  constructor() { }

  ngOnInit(): void {
  }

}
