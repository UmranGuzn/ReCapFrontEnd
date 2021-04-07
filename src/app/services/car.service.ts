import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  
  apiUrl="https://localhost:44368/api/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getall"
   return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath= this.apiUrl+ "cars/getbybrandid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
   }

   getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetail>>{
     let newPath=this.apiUrl+"cars/getbycolorid?colorId="+colorId;
     return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
   }

   getCarsDetail(carId:number):Observable<ItemResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetail?carId="+carId;
    return this.httpClient.get<ItemResponseModel<CarDetail>>(newPath);
   }

   getCarsBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
     // console.log(brandId+"brandId");
    let newPath=this.apiUrl+"cars/getcarsbrandandcolor?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
    
   }
}
