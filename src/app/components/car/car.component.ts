import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
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
  imagePath=environment.url+"/:carId";

  brandFilter:number
  colorFilter:number
  
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private brandService:BrandService,
    private colorService:ColorService) { }

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
     console.log(this.imagePath)
     console.log(environment.production)
   })
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
      console.log(brandId);
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
      console.log(brandId+"deneme");
      console.log(colorId);
    })
  }

   


}
