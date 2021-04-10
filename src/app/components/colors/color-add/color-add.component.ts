import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  add(){
    if (this.colorAddForm.valid) {
      let colorModel=Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(data=>{
        this.toastrService.success(data.message,"Başarılı")
      },dataError=>{
        this.toastrService.error(dataError.error.Errors.ErrorMesage)
      })
    }else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
}
