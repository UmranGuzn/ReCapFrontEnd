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
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:CarDetail[]=[];
  brands:Brand[]=[];
  colors:Color[]=[];
  dataLoaded=false;
  currentCarDetail:CarDetail;
  images:CarImage[];
  imagePath=environment.baseUrl;

  brandFilter:number
  colorFilter:number
  
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private brandService:BrandService,
    private colorService:ColorService,private carImageService:CarimageService) { }

  ngOnInit(): void {
  this.getBrands();
  this.getColors();

    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"] && params["colorId"]){
        this.getCarsBrandAndColor(params["brandId"],params["colorId"])
        //console.log(params["brandId"],params["colorId"]);
      }else if(params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }else if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }
      else{
        this.getCars()
      }
    })
  }

  getCars(){
   this.carService.getCars().subscribe(response=>{
     this.cars=response.data;
     this.dataLoaded=true;
     console.log(response.data)
   })
  }
  getCarImageByCarId(){
    this.carImageService.getCarImages().subscribe(response=>{
      this.images=response.data;
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

  setCurrentCarDetails(car:CarDetail){
    this.currentCarDetail=car;
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
   }

   getCarsByColor(colorId:number){
     this.carService.getCarsByColor(colorId).subscribe(response=>{
       this.cars=response.data;
       this.dataLoaded=true;

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

   getSelectColor(colorId:number){
    if(this.colorFilter==colorId){
      return true;
    }
    else{
      return false;
    }
  }

  getCarsBrandAndColor(brandId:number,colorId:number){
    this.carService.getCarsBrandAndColor(brandId,colorId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  }

   


}
