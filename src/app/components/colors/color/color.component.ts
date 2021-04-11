import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { AuthService } from 'src/app/services/auth.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[]=[];
  currentColor:Color;
  filterText:""
  constructor(private colorService:ColorService,private toastr:ToastrService,private authService:AuthService) { }

  ngOnInit(): void {
    this.getColor()
  }

  getColor(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  setCurrentColor(color:Color){
    this.currentColor=color
  }
  delete(color:Color){
    this.colorService.delete(color).subscribe(response=>{
      this.toastr.success(color.colorName+" Deleted")
    },responseError=>{
      this.toastr.error("Error")
    })
  }

  isAuthentication(){
    return this.authService.isAuthenticated();
  }
}
