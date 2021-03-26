import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  
  apiUrl="https://localhost:44368/api/";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetail"
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

   getCarsDetail(carId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getbyid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
   }
}
