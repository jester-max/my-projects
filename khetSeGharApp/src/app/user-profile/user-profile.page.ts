import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {ServicesService} from "../services.service";
import {StotageServiceService} from "../services/stotage.service.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  openDiv: boolean = false;
  userData:any;
  constructor(private router: Router,private alertController: AlertController,private storageService:StotageServiceService,private service:ServicesService) { }

  closeDiv() {
    this.openDiv = false;
  }
  public alertButtons = [
    {
      text: 'no',
      cssClass: 'alert-cancel',
    },
    {
      text: 'yes',
      cssClass: 'alert-confirm',
      handler:()=>{
        console.log('clicked')
        this.storageService.remove('accessToken')
        this.router.navigate(['login'])
      }
    },
  ];


  async presentAlert() {
    const alert = await this.alertController.create({
      id: 'logout-alert',
      cssClass: 'custom-alert',
      header: 'Are you sure you want to logout?',
      buttons: this.alertButtons,
    });
    await alert.present();
  }


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
