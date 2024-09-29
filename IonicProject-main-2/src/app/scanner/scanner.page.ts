import { Component, OnInit } from '@angular/core';
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {ServiceService} from "../service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PushNotifications} from "@capacitor/push-notifications";

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  scanResult:any
  scanResult2:any
  visiblity=''
  constructor(private service:ServiceService,private router:Router,public ActiveRouter:ActivatedRoute) { }

  ngOnInit() {
    this.addListeners
  }

  async addListeners () {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }

  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  }

  async getDeliveredNotifications  ()  {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }

  // startScan(){
  //   this.barcode.scan({
  //     disableSuccessBeep:true,
  //   }).then((barcodeData:any) => {
  //     console.log('barcode data', barcodeData);
  //     this.scanResult2 = barcodeData?.text;
  //   }).catch((err:any) => {
  //     console.log('error', err)
  //   })
  // }

  async checkPermission() {

    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      // the user granted permission
      return true;
    }
    return false;
  }

  async startScan() {
      // this.scanResult2=res.data.productName
    try {
      const permission = await this.checkPermission();
      if (!permission){
        return;
      } else {
        // await BarcodeScanner.hideBackground();
        this.visiblity = 'hidden'
        const result = await BarcodeScanner.startScan();
        console.log(result)
        BarcodeScanner.startScan();
        this.visiblity = ''
        if (result?.hasContent){
          // this.scanResult2 = result.content
          this.scanResult2 = result.content
          this.stopScan()
          this.router.navigate(['/issue/',this.ActiveRouter.snapshot.params['Id'],result.content])
        }
      }
    } catch (e){
      console.log(e)
      this.startScan()
    }
  };

  stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.visiblity = ''
  }

  getData(){
    console.log(this.scanResult2)
    // this.service.scanResult('8900000000012').subscribe((res:any)=>{
    //   this.scanResult2=res.data.stockId
    //   this.router.navigate(['/issue/',res.data.productName])
    //   console.log(res)
    // })
  }

}
