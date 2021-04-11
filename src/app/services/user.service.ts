import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl=environment.url;

  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+"users/getall";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getByUserId(userId:number):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"users/getbyid?id="+userId; 
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getUserByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"users/getbymail?email="+email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(user:User):Observable<ResponseModel>{
    let newPath=this.apiUrl+"users/user/edit";
    return this.httpClient.post<ResponseModel>(newPath,user);
  }

  addUserAsCustomer():Observable<ResponseModel>{
    return this.httpClient.get<ResponseModel>(this.apiUrl+"users/adduserascustomer")
  }
}
