import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/cars/car/car.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/colors/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CategoryComponent } from './components/category/category.component';
import { CarDetailComponent } from './components/cars/car-detail/car-detail.component';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { CreditcardComponent } from './components/creditcard/creditcard.component'


import { ToastrModule } from 'ngx-toastr';
import { RentAddComponent } from './components/rent-add/rent-add.component';
import { BrandAddComponent } from './components/brands/brand-add/brand-add.component';
import { ColorAddComponent } from './components/colors/color-add/color-add.component';
import { CarAddComponent } from './components/cars/car-add/car-add.component';
import { BrandUpdateComponent } from './components/brands/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/colors/color-update/color-update.component';
import { CarUpdateComponent } from './components/cars/car-update/car-update.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    NaviComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CategoryComponent,
    CarDetailComponent,
    FilterCarPipe,
    FilterBrandPipe,
    FilterColorPipe,
    CreditcardComponent,
    RentAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule
   
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
