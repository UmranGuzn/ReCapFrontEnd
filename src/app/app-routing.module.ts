import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brands/brand/brand.component';
import { BrandAddComponent } from './components/brands/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brands/brand-update/brand-update.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { CarComponent } from './components/cars/car/car.component';
import { CarAddComponent } from './components/cars/car-add/car-add.component';
import { CarUpdateComponent } from './components/cars/car-update/car-update.component';
import { CategoryComponent } from './components/category/category.component';
import { ColorComponent } from './components/colors/color/color.component';
import { ColorAddComponent } from './components/colors/color-add/color-add.component';
import { ColorUpdateComponent } from './components/colors/color-update/color-update.component';
import { CreditcardComponent } from './components/creditcard/creditcard.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentAddComponent } from './components/rent-add/rent-add.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [ 
  {path:"",pathMatch:"full", component:CategoryComponent},
  {path:"cars",component:CarComponent},
  {path:"rentals",component:RentalComponent},
 // {path:"car",component:CarComponent},
  {path:"brand",component:BrandComponent},
  {path:"color",component:ColorComponent},
 // {path:"rental",component:RentalComponent},
  //{path:"customer",component:CustomerComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/:carId",component:CarDetailComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"cars/:carId/rentcar",component:RentAddComponent},
  //{path:"cars/:carId/rentcar/creditcard",component:CreditcardComponent}
  {path:"creditcard/:rental",component:CreditcardComponent},
  {path:"brand/add",component:BrandAddComponent},
  {path:"color/add",component:ColorAddComponent},
  {path:"car/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"brand/update/:brandId",component:BrandUpdateComponent},
  {path:"color/update/:colorId",component:ColorUpdateComponent},
  {path:"car/update/:carId",component:CarUpdateComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
