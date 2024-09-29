import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ServicesService} from "../services.service";

@Component({
  selector: 'app-user-address-details',
  templateUrl: './user-address-details.page.html',
  styleUrls: ['./user-address-details.page.scss'],
})
export class UserAddressDetailsPage implements OnInit {
  userData:any
  constructor(public navCtrl: NavController, private service: ServicesService) { }

  userAddressData() {
    this.service.getAddress().subscribe((res: any) => {
      console.log('getAddress API Response:', res);
      if (res && res.data) {
        this.userData = res.data;
        console.log('User Data:', this.userData);
      }
    }, (error) => {
      console.error('Error fetching user address data:', error);
    });
  }


  ngOnInit() {
    this.userAddressData()
  }

}
