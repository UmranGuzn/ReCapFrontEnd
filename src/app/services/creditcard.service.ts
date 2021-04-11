import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {

  apiUrl="https://localhost:44368/api/creditcards/";

  constructor(private httpClient:HttpClient) { }

  getCreditCard(userId:number):Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"/getbyuserid?userid="+userId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }
  add(card:CreditCard):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",card);
  }

  getByCustomerId(id:number):Observable<ListResponseModel<CreditCard>>{
    return this.httpClient.get<ListResponseModel<CreditCard>>(this.apiUrl+"/getbycustomer?id="+id);
  }
  
  
}
