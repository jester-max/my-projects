import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServicesService} from "../../services.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-address-verify',
  templateUrl: './address-verify.page.html',
  styleUrls: ['./address-verify.page.scss'],
})
export class AddressVerifyPage implements OnInit {
    addressDetails:FormGroup
   userData:any
  constructor(public navCtrl: NavController, private formBuilder: FormBuilder ,private service:ServicesService,private router:Router) {
    this.addressDetails = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required],
      contact: ['', [Validators.required ,Validators.minLength(10)]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['',[Validators.required,Validators.minLength(6)]] ,
    });
  }


  addressData(){
      const addressDetails={
        firstName:this.addressDetails.get('firstName')?.value,
        lastName:this.addressDetails.get('lastName')?.value,
        contact:this.addressDetails.get('contact')?.value,
        address:{
          streetAddress:this.addressDetails.get('streetAddress')?.value,
          city:this.addressDetails.get('city')?.value,
          state:this.addressDetails.get('state')?.value,
          zipCode:this.addressDetails.get('zipCode')?.value,
        }
      }
      console.log(addressDetails);
    if (this.addressDetails.valid) {
      console.log(this.addressDetails.value)
      this.service.userAddress(addressDetails).subscribe((res:any) => {
        if (res.status === 'success') {
          this.service.toastSuccess(' profile updated successfully');

          this.router.navigate(['/select-box-size']);
        }else {
          this.service.toastSuccess('updation failed. Please try again');
        }
      })
    } else {
      this.service.toastSuccess('Please fill all required fields correctly');
      console.log('Form is invalid');
    }
  }




  ngOnInit() {

  }

}
