import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl=environment.url;
  constructor(private httpClient:HttpClient) { }

  login(login:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/login",login)
  }

  register(register:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/register",register)
  }

  isAuthenticated(){
    if (localStorage.getItem("token")) {
      return true
    }else{
      return false;
    }
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email')
  }

}
