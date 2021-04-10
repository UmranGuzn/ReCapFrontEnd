import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;

  brands:Brand[];
  colors:Color[];

  constructor(private formBuilder:FormBuilder,private carService:CarService,
    private toastrService:ToastrService,private brandService:BrandService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
  }

  createCarAddForm(){
    this.carAddForm=this.formBuilder.group({
        brandId:["",Validators.required],
        colorId:["",Validators.required],
        modelYear:["",Validators.required],
        descriptions:["",Validators.required],
        dailyPrice:["",Validators.required]
    })
    console.log(this.formBuilder)
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  add(){
    if (this.carAddForm.valid) {
       let carModal=Object.assign({},this.carAddForm.value)
       this.carService.add(carModal).subscribe(response=>{
        console.log(response)
        this.toastrService.success("Ok")

    },responseError=>{
      console.log(responseError.error)
      // if (reponseError.error.Errors.length > 0) {
      //   for (let i = 0; i < reponseError.error.Errors.lenght; i++) {
      //     this.toastrService.error(reponseError.error.Errors[i].ErrorMesage)
          
      //   }
        
      // }
    })
    }
   
    
  }

}
