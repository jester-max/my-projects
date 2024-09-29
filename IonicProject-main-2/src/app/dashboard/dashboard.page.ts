import {Component, OnInit, ViewChild} from '@angular/core';
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {ServiceService} from "../service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IonModal} from "@ionic/angular";
import {StatusBar} from "@capacitor/status-bar";
import {PushNotifications} from "@capacitor/push-notifications";
import {
  ApexDataLabels,
  ApexGrid, ApexLegend,
  ApexMarkers,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";
import {DatePipe} from "@angular/common";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any[];
  stroke:ApexStroke;
  markers:ApexMarkers;
  grid:ApexGrid;
  tooltip:ApexTooltip;
  colors:any[];
  xaxis:ApexXAxis;
  yaxis:ApexYAxis;
  title:ApexTitleSubtitle;
  dataLabels:ApexDataLabels;
  legend:ApexLegend,
  subtitle:ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [DatePipe]
})
export class DashboardPage implements OnInit {
  @ViewChild('modal') modal!: IonModal;
  @ViewChild('chart') chart: ChartComponent;

  showSubModule:any = false
  backdrop:any = false
  scanResult:any
  scanResult2:any
  visiblity=''

  Stock:any
  inventoryValue:any

  // for the toast status
  isToastOpen = false;
  class:any
  icon:any
  message:any
  toastButtons = [{text: 'Okay'}];

  filters:any={fromDate:'',toDate:''}

  public chartOptions: Partial<ChartOptions>|any;
  public areaOptions: Partial<ChartOptions>|any;
  public barOptions: Partial<ChartOptions>|any;

  constructor(private service:ServiceService,private router:Router,public ActiveRouter:ActivatedRoute, private datePipe: DatePipe) {
    this.service.GetInventoryChart().subscribe((res:any)=>{
      this.chartOptions.series=[res.data?.lowPrice, res.data?.high, res.data?.medium, res.data?.deathInventory]
    })
    this.chartOptions = {
      series:[],
      chart: {
        width: '100%',
        type: "pie"
      },
      labels: ["Low Profit", "High Profit", "Medium Profit","Dead Inventory"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%'
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.areaChart();
    this.barChart();
  }

  areaChart(){
    this.areaOptions={
      chart:{
        type:'area',
        height:200,
        sparkline:{
          enabled:true
        }
      },
      series:[
        {
          name:'Sales',
          data:[
            47,45,54,38,56,24,65,31,37,39,62,51,35,41,35,27,93,53,61,27,54,43,19,46
          ]
        }
      ],
      stroke:{
        width:2,
        color:['#4074f8']
      },
      fill:{
        colors:['#4074f8'],
        gradient:{
          gradientToColors:['#7e9cea'],
          opacityTo:0.2,
        }
      },
      tooltip:{
        theme:'dark',
        x:{
          show:false
        },
        y:{
          show:false
        }
      },
      colors:['#08a0fc'],
      title:{
        text:'12345',
        offsetX:20,
        style: {
          fontSize: '24px',
          color:'#78909c',
        }
      },
      subtitle:{
        text:'Value',
        offsetX:20,
        style: {
          fontSize: '14px',
          color:'rgb(89,131,245)',
        }
      }
    }
  }

  barChart(){
    this.barOptions = {
      series: [
        {
          name: "QTY",
          data: [0]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
       ""
        ]
      }
    };
  }

  ngOnInit() {
    this.allStatus();
    this.inventoryValueStatus();
    StatusBar.setBackgroundColor({color:'#3880ff'})
    this.registerNotifications();
    this.chartFiler(this.filters)
  }

  chartFiler(data:any){
    this.service.InventoryDailyUsesgoods(data).subscribe((res:any)=>{
      console.log(res)
      if (res.status === 'SUCCESS'){
        this.message=res.message
        this.toastOpen(res.status)
        const _idArray = res.data.map((item: { _id: any; }) => item._id);
        const maxRemainingArray = res.data.map((item: { totalQuantity: any; }) => item.totalQuantity.toFixed(2));
        this.chart.updateOptions({
          xaxis:{
            categories:_idArray
          }
        })
        this.chart.updateSeries([{
          data:maxRemainingArray
        }])
      } else {
        this.message=res.message
        this.toastOpen(res.status)
      }
    })
  }

  allStatus(){
    this.service.AllStock().subscribe((res:any)=>{
      this.Stock = res?.data
      console.log(res)
    })
  }

  inventoryValueStatus(){
    this.service.InventoryValueStock().subscribe((res:any)=>{
      this.inventoryValue = res?.data
    })
  }

  showBotton(backdrop:any){
    this.backdrop = !backdrop;
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
          await this.modal.present();
          // this.router.navigate(['/create-issue'])
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

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      location.reload();
      event.target.complete();
    }, 2000);
  }

  loader() {
    location.reload();
  }

  async addListeners () {
    await PushNotifications.addListener('registration', token => {
      this.service.SendToken(token.value).subscribe((res:any)=>{
        console.log(res)
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

  toastOpen(isOpen: any) {
    this.isToastOpen = isOpen;
    if (isOpen === 'SUCCESS'){
      this.class = isOpen
      this.icon = 'checkmark-done-outline'
    } else if (isOpen === 'PENDING'){
      this.class = isOpen
      this.icon = 'alert-circle-outline'
    } else if (isOpen === 'ERROR'){
      this.class = isOpen
      this.icon = 'remove-circle-outline'
    }
  }
}
