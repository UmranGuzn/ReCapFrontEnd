import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';


@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  updateCarForm:FormGroup

  car:CarDetail

  constructor(private formBuilder:FormBuilder,private carService:CarService,
    private toastr:ToastrService,private activated:ActivatedRoute) { }

  ngOnInit(): void {
    this.createCarUpdateForm()
    this.activated.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarById(params["carId"])
      }

    })
  }

  createCarUpdateForm(){
    this.updateCarForm=this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      modelYear:["",Validators.required],
      descriptions:["",Validators.required],
      dailyPrice:["",Validators.required]
    })
  }

  getCarById(carId:number){
    this.carService.getCarsDetail(carId).subscribe(response=>{
      this.car=response.data;
      this.updateCarForm.setValue({
        brandId:this.car.brandId,
        colorId:this.car.colorId,
        modelYear:this.car.modelYear,
        descriptions:this.car.descriptions,
        dailyPrice:this.car.dailyPrice
      })
    })
  }

  update(){
    if (this.updateCarForm.valid) {
      let carModal:CarDetail=this.updateCarForm.value
      carModal.carId=this.car.carId
      this.carService.update(carModal).subscribe(response=>{
        this.toastr.success("Başarılı")
      },responseError=>{
        this.toastr.error(responseError.error)
      })
    }else{
      this.toastr.warning("error")
    }
  }

  delete(car:CarDetail){
    this.carService.delete(car).subscribe(response=>{
      this.toastr.success("silindi")
      
    },responseError=>{
      this.toastr.error(responseError.error)
    })
  }

}
