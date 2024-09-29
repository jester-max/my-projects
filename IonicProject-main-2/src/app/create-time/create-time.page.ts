import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {ModalController, ToastController} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-time',
  templateUrl: './create-time.page.html',
  styleUrls: ['./create-time.page.scss'],
  providers: [DatePipe]
})
export class CreateTimePage implements OnInit {
  image:any='https://ionicframework.com/docs/img/demos/thumbnail.svg'
  WorkingMachineBarcode:any=''
  ItemBarcode:any=''
  PreTimeData:any
  selection:any=[]
  alertButtons = ['Cancel','Ok'];
  isToastOpen = false;
  class:any
  icon:any
  message:any
  toastButtons = [{text: 'Okay'}];

  scanResult:any
  visiblity=''

  workTime=[1]
  timeUnit=['HOURS', 'MINUTES']
  lable=['LEVEL-1', 'LEVEL-2', 'LEVEL-3']
  occupation=['FITTER', 'OPERATOR', 'HELPER']
  employeeName:any=[]
  employeeText:any=''
  filteredData:any=[]
  constructor(private service:ServiceService, private datePipe: DatePipe,private modalCtrl: ModalController) {}

  ngOnInit() {
    for (let i = 2; i <= 60; i++) {
      this.workTime.push(i);
    }
    this.PreTimeData = {
      productUnitID:'',
      productID:'',
      wipID:'',
      date:'',
      employeeName:'',
      productName:'',
      productSpecification:'',
      workTime:0,
      timeUnit:'HOURS',
      occupation:'',
      amount:0,
      lable:'',
      notes:'',
    }
    this.PreTimeData.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.WorkingMachineBarcode=''
    this.ItemBarcode=''

    this.service.GetEmployee().subscribe((res:any)=>{
      this.employeeName = res.data.data
      this.searchTime();
    })
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source:CameraSource.Prompt,
      saveToGallery:true
    });
    this.image = image.dataUrl
  }

  CreateTime(item:any){
    this.service.CreateTime(item).subscribe((res:any)=>{
      if (res.status==='SUCCESS'){
        location.reload();
      }
      this.message = res.message
      this.setOpen(res.status)
    })
  }

  ScanTime(timeScanResult:any){
    this.service.ScanItem(timeScanResult).subscribe((res:any)=>{
      this.message = res.message
      this.setOpen(res.status)
      this.PreTimeData.employeeName = res.data?.employeeName
      this.PreTimeData.workTime = res.data?.workTime
      this.PreTimeData.timeUnit = res.data?.timeUnit
      this.PreTimeData.occupation = res.data?.occupation
      this.PreTimeData.amount = res.data?.amount
      this.PreTimeData.lable = res.data?.lable
      this.PreTimeData.notes = res.data?.notes
      this.ItemBarcode = res.data?.barcodeImageWithHTTP
    })
  }

  ScanWorkingMachine(WorkingMachineScanResult:any){
    this.service.ScanMachine(WorkingMachineScanResult).subscribe((res:any)=>{
      console.log(res,'machine')
      this.message = res.message
      this.setOpen(res.status)
      this.PreTimeData.productName = res.data?.productName
      this.PreTimeData.productSpecification = res.data?.productSpecification
      this.PreTimeData.productUnitID = res.data?.productUnitID
      this.PreTimeData.productID = res.data?.productID
      this.PreTimeData.wipID = res.data?.wipID
      this.WorkingMachineBarcode = res.data.barcodeImageWithHTTP
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

  async startScan(scanfor:any) {
    try {
      const permission = await this.checkPermission();
      if (!permission){
        return;
      } else {
        this.visiblity = 'hidden'
        const result = await BarcodeScanner.startScan();
        console.log(result)
        BarcodeScanner.startScan();
        this.visiblity = ''
        if (result?.hasContent){
          this.scanResult = result.content
          if (scanfor === 'item'){
            this.ScanTime(this.scanResult)
          } else {
            this.ScanWorkingMachine(this.scanResult)
          }
          this.stopScan()
        }
      }
    } catch (e){
      console.log(e)
      this.startScan(scanfor)
    }
  };

  stopScan(){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.visiblity = ''
  }

  handleChange(i:any) {
    this.PreTimeData.batch = i.productBatch;
    this.PreTimeData.issueQuantity = i.productQuantity
  }

  handleWorkTime(i:any) {
    console.log(i)
    this.PreTimeData.workTime = i;
  }

  handleTimeUnit(i:any) {
    this.PreTimeData.timeUnit = i;
  }

  handleemployeeName(i:any) {
    this.employeeText=''
    this.PreTimeData.employeeName = i.firstName +" "+ i.lastName;
    this.modalCtrl.dismiss();
  }

  searchTime(){
    console.log(this.employeeText)
    this.filteredData = this.employeeName.filter((obj:any) => obj.firstName.toLocaleLowerCase().includes(this.employeeText.toLocaleLowerCase()));
    console.log(this.filteredData)
  }


  handleLevel(i:any) {
    this.PreTimeData.lable = i;
    if (i==='LEVEL-1'){
      this.PreTimeData.amount = 1200
    } else if(i==='LEVEL-2'){
      this.PreTimeData.amount = 600
    } else {
      this.PreTimeData.amount = 300
    }
  }

  handleOccupation(i:any){
    this.PreTimeData.occupation = i;
  }

  setOpen(isOpen: any) {
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

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }
}
