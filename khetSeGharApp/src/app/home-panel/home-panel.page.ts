import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Storage} from "@ionic/storage-angular";
import {Router} from "@angular/router";
import {Observable, shareReplay} from "rxjs";
import {ServicesService} from "../services.service";
import {IonModal} from "@ionic/angular";
import {options} from "ionicons/icons";
import {HttpClient} from "@angular/common/http";
import {PushNotifications} from "@capacitor/push-notifications";
import {StatusBar} from "@capacitor/status-bar";

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.page.html',
  styleUrls: ['./home-panel.page.scss'],
})
export class HomePanelPage implements OnInit {
  locationResult$!: Observable<any>;
  pinCode: string ='';
  deliveryDate: any;
  isFirstPage!: boolean;
  @ViewChild('pinCodeInput') inputField!: ElementRef;
  @ViewChild(IonModal) modal: IonModal|any;

  public zipCodeDetails={
    deliveryDates:[''],
    available:false,
    verify:'Not Verify',
    zipCode:'xxxxxx',
    block:'Kasarawad',
    district:'Khargone',
    state:'Madhya Pradesh',
  }

  cardsData:any = [
    {
      image: "assets/mix-Photoroom.png",
      header: "Mix Fruit and Vegetables",
      description: "Get Combination of HandPicked Fruits and vegetables.Good choice for people who don't cook often. ",
      link: "#"
    },
    {
      image: "assets/vegitabels-Photoroom.png",
      header: "Veggie Only",
      description: "This organic vegetable mix, recommended for the committed fellow for green vegetables, adds healthy nutrients to your diet.",
      link: "#"
    },
    {
      image: "assets/fruits-Photoroom.png",
      header: "Fruit Only",
      description: "All fruit! This box includes a lovely mix of luscious, ripe organic fruit. It is ideal for folks who adore fruit for snacking, baking, or juicing.",
      link: "#"
    },
    {
      image: "assets/seasonal-Photoroom.png",
      header: "Seasonal Only",
      description: "This mix contains exclusively produce which contains seasonal fruit and vegetable. ",
      link: "#"
    },
];

  constructor( public router: Router, private service:ServicesService,private HTTP:HttpClient) { }


  checkLocation() {
    if (!this.pinCode) {
      return;
    }
    console.log(this.pinCode)
    this.service.findZone(this.pinCode).subscribe((res:any)=>{
      console.log(res)
      if (res.available){
        this.zipCodeDetails.deliveryDates = res.deliveryDates
        this.zipCodeDetails.zipCode = this.pinCode
        this.zipCodeDetails.verify = 'Verified'
        this.zipCodeDetails.available = true
        localStorage.setItem('zipStatus',JSON.stringify(this.zipCodeDetails))
        localStorage.setItem('zipCode',this.pinCode)
        this.modal.dismiss(null,'cancel');
        this.getZipCode(this.pinCode);
        this.service.toastSuccess('Zip code verified successfully!')
      }else {
        this.zipCodeDetails.deliveryDates = []
        this.zipCodeDetails.zipCode = 'xxxxxx'
        this.zipCodeDetails.verify = 'Verify your zip code'
        this.zipCodeDetails.available=false
        this.service.toastSuccess('Invalid zip code, please try again.')
      }
    })
  }

  ngOnInit(){
    this.registerNotifications();
    StatusBar.setBackgroundColor({color:'#c8d1b7'})
      var data = localStorage.getItem('zipStatus')
    if (data){
      // @ts-ignore
      this.zipCodeDetails = JSON.parse(data)
      this.modal?.dismiss(null, 'cancel');
      this.pinCode = this.zipCodeDetails.zipCode
    }

      console.log(this.zipCodeDetails)

      if (this.router.url === '/') {
        this.isFirstPage = true;
      }

  }

  getZipCode(pincode:any){
    this.HTTP.get(`https://api.postalpincode.in/pincode/${pincode}`).subscribe((res:any)=>{
      console.log(res)
      if (res[0].Status === 'Success'){
        this.zipCodeDetails.district = res[0].PostOffice[0].District
        this.zipCodeDetails.block = res[0].PostOffice[0].Block
        this.zipCodeDetails.state = res[0].PostOffice[0].Circle
      }
      console.log(this.zipCodeDetails)
    })
  }

  async addListeners () {
    await PushNotifications.addListener('registration', token => {
      this.service.sendFCMToken(token.value).subscribe((res:any)=>{
        this.service.sendWelcome(token.value).subscribe((res:any)=>{
          console.log(res)
        })
        this.service.toastSuccess('token send successfully!')
      })
      localStorage.setItem('noticationToken',token.value)
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
    try {
      await this.addListeners();
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
      }

      await PushNotifications.register();
    }catch (e){
      console.log(e)
    }

  }

  async getDeliveredNotifications  ()  {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }


}
