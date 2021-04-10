import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  updateBrandForm: FormGroup

  brand: Brand

  constructor(private formBuilder: FormBuilder, private brandService: BrandService,
    private toastr: ToastrService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.createBrandUpdateForm()
    this.activated.params.subscribe(params => {
      if (params["brandId"]) {
        this.getBrandId(params["brandId"])
      }
    })
  }

  createBrandUpdateForm() {
    this.updateBrandForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }

  getBrandId(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.updateBrandForm.setValue({
        brandName: this.brand.brandName
      })
    })
  }
  update(){
   if(this.updateBrandForm.valid){
     let brandModal:Brand=this.updateBrandForm.value;
     brandModal.brandId=this.brand.brandId;
     this.brandService.update(brandModal).subscribe(response=>{
       this.toastr.success("Başarılı");
     },responseError=>{
       this.toastr.error(responseError.error)
     })
   }else{
     this.toastr.warning("Error");
   } 
  }

  delete(brand:Brand){
    this.brandService.delete(brand).subscribe(response=>{
      this.toastr.success(brand.brandName+" Deleted")
    },responseError=>{
      this.toastr.error(brand.brandName+" Silinmedi")
    })
  }

}
