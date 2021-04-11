import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
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

  // rental:Rental;
  // car:CarDetail;
  // quantity:number;

  // userId:number
  // cardNumber:string
  // fullName:string
  // expirationMonth:string
  // expirationYear:string
  // cvv:string

  creditCards:CreditCard[]=[]
  creditCardForm:FormGroup
 
  constructor(private creditCardService:CreditcardService,private formBuilder:FormBuilder,private carService:CarService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.createCreditCardAddForm()
   
  }

  createCreditCardAddForm() {
    this.creditCardForm = this.formBuilder.group({
      customerId:["",Validators.required],
      cardNumber: ['', Validators.required],
      fullName: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      cvv: ['', Validators.required],
      expirationYear: ['', Validators.required],
    });

  }
  // save() {
  //   let cardModel: CreditCard = {
  //     cardNumber: this.cardNumber,
  //     fullName: this.fullName,
  //     expirationMonth: this.expirationMonth,
  //     expirationYear:this.expirationYear,
  //     cvv: this.cvv,
  //     userId: this.rental.customerId,
  //   };
  //   this.creditCardService.add(cardModel).subscribe((response) => {
  //     this.toastr.success('SAVE OK');
  //     this.pay();
  //   },responseError => {
  //     this.toastr.error('ERRORR',responseError.error);
  //   });
  // }

  // setCardInfos() {
  //   this.creditCardForm.patchValue({
  //     cardNumber: this.cardNumber,
  //     fullName: this.fullName,
  //     expirationMonth: this.expirationMonth,
  //     expirationYear:this.expirationYear,
  //     cvv: this.cvv,
  //   });
  // }

  
  // getCar() {
  //   this.carService.getCarsDetail(this.rental.carId).subscribe(response => {
  //     this.car = response.data;
  //   })
  // }

  pay() {
    console.log("hebeel")
    if(this.creditCardForm.valid){
      console.log("deneme")
      let creditCardModel= Object.assign({},this.creditCardForm.value)
      this.creditCardService.add(creditCardModel).subscribe(response=>{
        this.toastr.success("ok");
      },responseError=>{
        this.toastr.error("Eeeor")
      })
    }

  
  }

}
