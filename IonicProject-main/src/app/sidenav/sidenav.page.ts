import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonRouterOutlet, ModalController, Platform} from "@ionic/angular";
import {ServiceService} from "../service.service";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {Location} from "@angular/common";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {StatusBar} from "@capacitor/status-bar";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.page.html',
  styleUrls: ['./sidenav.page.scss'],
})
export class SidenavPage implements OnDestroy, OnInit {
  scanResult:any
  scanResult2:any
  visiblity=''

  addItem:any
  issueItem:any
  wasteItem:any
  mistakeItem:any
  timeItem:any

  GetLoginData:any

  @ViewChild(IonRouterOutlet,{static:true}) RouterOutlet:IonRouterOutlet;
  constructor(private service:ServiceService,private router:Router,private cookie:CookieService,
              private platform:Platform, private modal:ModalController, private location:Location) {
    this.backButtonEvent();
  }

  backButtonEvent(){
    this.platform.backButton.subscribeWithPriority(10,()=>{
      this.modal.dismiss();
      this.stopScan();
      if (this.RouterOutlet.canGoBack()){
        this.RouterOutlet.pop();
        console.log(123)
      }
      this.location.back();
    })
  }

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
    console.log('hi vicky')
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
          this.scanResult2 = result.content
          this.stopScan()
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
    this.service.scanResult('8900000000012').subscribe((res:any)=>{
      // this.scanResult2=res.data.productName
      // this.router.navigate(['/scanner/',res.data.productName])
      console.log(res)
    })
  }

  ngOnDestroy():void{
    this.startScan();
  }



  ngOnInit():void{
    StatusBar.setBackgroundColor({color:'#3880ff'})
    this.service.StatusItem().subscribe((res:any)=>{this.addItem = res})
    this.service.StatusIssue().subscribe((res:any)=>{this.issueItem = res})
    this.service.StatusWaste().subscribe((res:any)=>{this.wasteItem = res})
    this.service.StatusMistake().subscribe((res:any)=>{this.mistakeItem = res})
    this.service.StatusTime().subscribe((res:any)=>{this.timeItem = res})

    this.service.LoginUser().subscribe((res:any)=>{
      this.GetLoginData = res.data
      console.log(res)
    })
  }

}
