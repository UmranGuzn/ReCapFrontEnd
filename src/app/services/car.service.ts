import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  
  apiUrl="https://localhost:44368/api/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetails"
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
    let newPath=this.apiUrl+"cars/getacardetailbyid?carId="+carId;
    return this.httpClient.get<ItemResponseModel<CarDetail>>(newPath);
   }

   getCarsBrandAndColor(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
     // console.log(brandId+"brandId");
    let newPath=this.apiUrl+"cars/getcarsbrandandcolor?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
    
   }

   add(car:Car):Observable<ResponseModel>{
     return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car);
   }
   update(car:CarDetail):Observable<ResponseModel>{
     return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
   }

   delete(car:CarDetail):Observable<ResponseModel>{
     return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/delete",car)
   }
}
