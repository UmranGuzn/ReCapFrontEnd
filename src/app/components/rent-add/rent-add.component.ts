import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-add',
  templateUrl: './rent-add.component.html',
  styleUrls: ['./rent-add.component.css']
})
export class RentAddComponent implements OnInit {

  rentals:Rental[]=[];
  customers:Customer[];

  customerId:number
  rentDate:Date
  rentBeginDate:Date
  returnDate:Date
  returnEndDate:Date

  @Input() car:CarDetail;



  constructor(private rentalService:RentalService,private router:Router,private customerService:CustomerService,
    private toastr:ToastrService,private authService:AuthService) { }

  ngOnInit(): void {
   this.getCustomer();
  }
  isLogin(){
    if(this.authService.isAuthenticated()){
      return true
    }else{
      this.toastr.error("Must be Login")
      this.router.navigate([""])
      return false;
    }
  }
  getCustomer(){
    this.customerService.getCustomer().subscribe(response=>{
      this.customers=response.data;

    })
  }

  getDate(day:number){
    var today=new Date();
    today.setDate(today.getDate()+day);
    return today.toISOString().slice(0,10)
  }

  create(){
    let rental:Rental={
      carId:this.car.carId,
      customerId:parseInt(this.customerId.toString()),
      rentDate:this.rentDate,
      returnDate:this.returnDate

    }
    console.log(rental)
    this.rentalService.add(rental).subscribe(response=>{
      this.toastr.info("payment Page");
      this.toastr.success(response.message);
      this.router.navigate(['/creditcard',JSON.stringify(rental)]);
      console.log(rental);
    },error=>{
      this.toastr.error(error.error);
      console.log(this.car.colorName);
    })
  }

}
