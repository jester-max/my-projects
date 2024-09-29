import { Component, OnInit } from '@angular/core';
import{ServiceService} from "../service.service";
import {resize} from "ionicons/icons";
import {ModalController, ToastController} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-mistake',
  templateUrl: './create-mistake.page.html',
  styleUrls: ['./create-mistake.page.scss'],
  providers: [DatePipe]
})
export class CreateMistakePage implements OnInit {
  image:any='https://ionicframework.com/docs/img/demos/thumbnail.svg'
  WorkingMachineBarcode:any=''
  ItemBarcode:any=''
  PreMistakeData:any
  selection:any=[]
  alertButtons = ['Cancel','Ok'];
  isToastOpen = false;
  class:any
  icon:any
  message:any
  toastButtons = [{text: 'Okay'}];
  severityOfMistake=['HIGH', 'LOW', 'MEDIUM']
  typeOfMistake=['TECHNICAL', 'PHYSICAL', 'EMOTIONAL']
  eyeWitness:any=[]
  employeeRole=['EMPLOYEE','FITTER','WELDER','HELPER','OPERATOR','MANAGER','IT-STAFF','GENERAL-MANAGER','SUPERVISOR']
  employeeName:any=[]
  employeeText:any=''
  filteredData:any=[]
  scanResult:any
  visiblity=''
  constructor(private service:ServiceService, private datePipe: DatePipe, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.PreMistakeData = {
      date: '',
      mistakeId:'',
      employeeID:'',
      employeeName: '',
      employeeRole:'',
      description: '',
      severityOfMistake: '',
      typeOfMistake: '',
      explanation: '',
      eyeWitness: '',
      workExperience: [{experience: ''}],
      actionOnMistake: '',
      costOfMistake: '',
      inventoryID:'',
      productSpecification:'',
      productUnitID:'',
      productID:'',
      purpose:'',
      specification:'',
      note:''
    }
    this.PreMistakeData.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.WorkingMachineBarcode=''
    this.ItemBarcode=''

    this.service.GetEmployee().subscribe((res:any)=>{
      console.log(res)
      this.employeeName = res.data.data
      this.eyeWitness = res.data.data
      this.searchMistake();
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

  CreateMistake(item:any){
    this.service.CreateMistake(item).subscribe((res:any)=>{
      if (res.status==='SUCCESS'){
        location.reload();
      }
      this.message = res.message
      this.setOpen(res.status)
    })
  }

  ScanMistake(mistakeScanResult:any){
    this.service.ScanProduct(mistakeScanResult).subscribe((res:any)=>{
      this.message = res.message
      this.setOpen(res.status)
      this.PreMistakeData.description = res.data?.productName
      this.PreMistakeData.inventoryID = res.data?.inventoryID
      this.PreMistakeData.productSpecification = res.data?.productSpecification
      this.ItemBarcode = res.data?.barcodeImageWithHTTP
    })
  }

  ScanWorkingMachine(WorkingMachineScanResult:any){
    this.service.ScanMachine(WorkingMachineScanResult).subscribe((res:any)=>{
      console.log(res,'machine')
      this.message = res.message
      this.setOpen(res.status)
      this.PreMistakeData.productUnitID = res.data.productUnitID
      this.PreMistakeData.productID = res.data.productID
      this.PreMistakeData.purpose = res.data?.productName
      this.PreMistakeData.specification = res?.data.productSpecification
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
            this.ScanMistake(this.scanResult)
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
    this.PreMistakeData.batch = i.productBatch;
    this.PreMistakeData.issueQuantity = i.productQuantity
  }

  handleseverityOfMistake(i:any) {
    console.log(i)
    this.PreMistakeData.severityOfMistake = i;
  }

  handletypeOfMistake(i:any) {
    this.PreMistakeData.typeOfMistake = i;
  }

  handleeyeWitness(i:any) {
    this.employeeText=''
    this.PreMistakeData.eyeWitness = i.firstName +" "+ i.lastName;
    this.modalCtrl.dismiss();
  }

  handleemployeeRole(i:any) {
    this.PreMistakeData.employeeRole = i;
  }

  handleemployeeName(i:any) {
    this.employeeText=''
    this.PreMistakeData.employeeName = i.firstName +" "+ i.lastName;
    this.modalCtrl.dismiss();
  }

  searchMistake(){
    console.log(this.employeeText)
    this.filteredData = this.employeeName.filter((obj:any) => obj.firstName.toLocaleLowerCase().includes(this.employeeText.toLocaleLowerCase()));
    console.log(this.filteredData)
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
