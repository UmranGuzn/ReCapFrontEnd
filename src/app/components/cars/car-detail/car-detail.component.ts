import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { CarimageService } from 'src/app/services/carimage.service';
import { ColorService } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  cars:CarDetail[]=[];
  car:CarDetail;
  dataShow=false;
  brands:Brand[]=[];
  colors:Color[]=[];
  brandFilter:number
  colorFilter:number;
  currentCarDetail:CarDetail

  images:CarImage[]
  imagePath=environment.baseUrl;

  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,
    private brandService:BrandService,private colorService:ColorService,
    private carImageService:CarimageService) { }

  ngOnInit(): void {

    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarsDetail(params["carId"]);
        this.getCarImageByCarId(params["carId"]);
      }
      else if(params["brandId"] && params["colorId"]){
        this.getCarsBrandAndColor(params["brandId"],params["colorId"])
      }else{
       this.getCars();
      }
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
     this.dataShow=true;
    })
   }

  getCarImageByCarId(carId:number){
    this.carImageService.getCarImageByCarId(carId).subscribe(response=>{
      this.images=response.data;
      //console.log(response.data);
    })
  } 

  getSliderClassName(index:number){
    if(index==0){
      return "carousel-item active";
    }else{
      return "carousel-item";
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }
  getSelectBrand(brandId:number){
    if(this.brandFilter==brandId){
      return true;
    }
    else{
      return false;
    }
  }
  setCurrentCarDetails(car:CarDetail){
    this.currentCarDetail=car;
  }

  getSelectColor(colorId:number){
   if(this.colorFilter==colorId){
     return true;
   }
   else{
     return false;
   }
 }


  getCarsDetail(carId:number){
  this.carService.getCarsDetail(carId).subscribe(response=>{
   this.car=response.data
  })

  
  }

  // getCarsByCarId(carId:number){

  //   this.carService.getCarsDetail(carId).subscribe(response=>{
  //     this.cars=response.data;
      
  //   })
  // }

  getCarsBrandAndColor(brandId:number,colorId:number){
    this.carService.getCarsBrandAndColor(brandId,colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataShow=true;
    })
  }

addToCart(car:Car){
  
}

 
}
