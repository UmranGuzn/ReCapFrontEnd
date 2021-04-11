import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  fullName:string
  userId:number
  constructor(private authService:AuthService,private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
  }

  getUser(){
    return localStorage.getItem('fullName');
  }

  isAuthentication(){
    return this.authService.isAuthenticated();
  }

  logOut(){
    this.authService.logOut()
    this.toastr.info("Log Out OK!")
    this.router.navigate([""])
  }

}
