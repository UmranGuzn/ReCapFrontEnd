import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  updateColorForm:FormGroup;

  color:Color
  constructor(private colorService:ColorService,private formBuilder:FormBuilder,
    private toastr:ToastrService,private activated:ActivatedRoute) { }

  ngOnInit(): void {
    this.createColorUpdateForm()
    this.activated.params.subscribe(params=>{
      if (params["colorId"]) {
        this.getColorById(params["colorId"])
      }
    })
  }

  getColorById(colorId:number){
    this.colorService.getColorById(colorId).subscribe(response=>{
      this.color=response.data
      this.updateColorForm.setValue({
        colorName:this.color.colorName
        
      })
      console.log(colorId)
    })
  }

  createColorUpdateForm(){
    this.updateColorForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  update(){
    if (this.updateColorForm.valid) {
      let colorModal:Color=this.updateColorForm.value;
      colorModal.colorId=this.color.colorId;
      this.colorService.update(colorModal).subscribe(response=>{
        this.toastr.success("Başarılı");
      },responseError=>{
        this.toastr.error(responseError.error)
      })
    }else{
      this.toastr.warning("Error")
    }
  }

  delete(color:Color){
    this.colorService.delete(color).subscribe(response=>{
      this.toastr.success(color.colorName+" Deleted")
    },responseError=>{
      this.toastr.error("Error")
    })
  }


}
