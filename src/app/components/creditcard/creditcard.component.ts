import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditcardService } from 'src/app/services/creditcard.service';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit {

  rental:Rental;
  car:Car;
  quantity:number;

  id:number
  cardNumber:string
  fullName:string
  expirationMonth:string
  expirationYear:string
  cvv:string

  creditCards:CreditCard[]=[]
  creditCardForm:FormGroup
 
  constructor(private creditCardService:CreditcardService,private formBuilder:FormBuilder,private carService:CarService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  creditCardaddForm(){

  }

}
