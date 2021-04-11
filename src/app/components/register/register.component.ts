import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private authService:AuthService,
    private toastr:ToastrService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel=Object.assign({},this.registerForm.value)
      this.authService.register(registerModel).subscribe(response=>{
        if (response.success) {
          this.userService.addUserAsCustomer().subscribe(response=>{
            console.log(response)
          },error=>{
            console.log(error)
          })
        };
        this.toastr.info(response.message)
        this.router.navigate(['/login']);
      },responseError=>{
        this.toastr.error(responseError.error,"Dikkat")
      })
    }
  }

}
