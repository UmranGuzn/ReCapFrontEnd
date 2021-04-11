import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editProfileForm:FormGroup;
  password:FormControl

  email:string
  user:User

  constructor(private userService:UserService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.createProfileEditForm();
    this.getUser()
  }

  createProfileEditForm(){
    this.editProfileForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  getUser(){
    this.userService.getUserByEmail(localStorage.getItem('email')!).subscribe(response=>{
      this.user=response.data
      this.editProfileForm.setValue({
        firstName:this.user.firstName,
        lastName:this.user.lastName,
        email:this.user.email,
        password:""
      })
    },responseError=>{
      this.toastrService.error(responseError.erorr)
    })
  }

  editProfile(){
    if(this.editProfileForm.valid){
      let profileModel=Object.assign({},this.editProfileForm.value)
     
      profileModel.userId=this.user.userId
      this.userService.update(profileModel).subscribe(response=>{
        this.toastrService.success("Login AGAIN please");
        this.router.navigate(['/login'])
        this.authService.logOut();
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Error")
    }
  }

}
