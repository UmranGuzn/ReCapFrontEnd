import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands:Brand[]=[];
  currentBrand:Brand;
  filterText:""
  constructor(private brandService:BrandService,private toastr:ToastrService,private authService:AuthService) { }


  ngOnInit(): void {
    this.getBrand();
  }

  getBrand(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;

    })
  }
  setCurrentBrand(brand:Brand){
    //console.log(category.brandName);
    this.currentBrand=brand;
  }

  delete(brand:Brand){
    this.brandService.delete(brand).subscribe(response=>{
      this.toastr.success(brand.brandName+" Deleted")
      this.getBrand()
    },responseError=>{
      this.toastr.error(brand.brandName+" Silinmedi")
    })
  }

  isAuthentication(){
    return this.authService.isAuthenticated();
  }

}
