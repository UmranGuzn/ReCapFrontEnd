import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private brandService: BrandService,
    private toastrService: ToastrService,private router:Router) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ["", Validators.required]
    })
  }

  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(data => {
        console.log(data);
        this.router.navigate(['/brand'])
        this.toastrService.success(data.message, "Başarılı")
      }, dataError => {
        if (dataError.error.Errors.length > 0) {
          for (let i = 0; i < dataError.error.Errors.lenght; i++) {
            this.toastrService.error(dataError.error.Errors[i].ErrorMesage)
            
          }
          
        }


      })
    } else {
      this.toastrService.error("Formunuz Eksik", "Dikkat")
    }


  }
}
