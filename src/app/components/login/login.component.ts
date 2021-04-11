import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  user:User
  constructor(private formBuilder:FormBuilder,private authService:AuthService,
    private toastr:ToastrService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
     // console.log(this.loginForm.value)
      let loginModel=Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastr.info(response.message)
        localStorage.setItem("token",response.data.token)
        this.router.navigate([""])
       this.getUser(loginModel.email);

      },responseError=>{
        this.toastr.error(responseError.error)
        console.log(responseError.error)
      })
    }
  }

  getUser(email:string){
      this.userService.getUserByEmail(email).subscribe(response=>{
        this.user=response.data;
        console.info(this.user)
        console.log(this.user)
        localStorage.setItem("fullName",this.user.firstName+" "+this.user.lastName);
        localStorage.setItem("email",this.user.email)
        localStorage.key(this.user.userId)
      })
  }

}
