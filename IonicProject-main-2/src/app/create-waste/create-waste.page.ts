import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {ModalController, ToastController} from "@ionic/angular";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-waste',
  templateUrl: './create-waste.page.html',
  styleUrls: ['./create-waste.page.scss'],
  providers: [DatePipe]
})
export class CreateWastePage implements OnInit {
  image:any='https://ionicframework.com/docs/img/demos/thumbnail.svg'
  WorkingMachineBarcode:any=''
  ItemBarcode:any=''
  PreWasteData:any
  selection:any=[]
  alertButtons = ['Cancel','Ok'];
  isToastOpen = false;
  class:any
  icon:any
  message:any
  toastButtons = [{text: 'Okay'}];

  wasteGivenBy:any=[]
  wasteRecievedBy:any=[]
  station=['STATION-1','STATION-2','STATION-3','STATION-4','STATION-5']

  scanResult:any
  visiblity=''
  wasteUnit=['NOS','KILOGRAM','GRAM','METER','FIT','LITER','MILLI LITER']
  partyName:any=[]
  customerText:any=''
  employeeText:any=''
  filteredData:any=[]
  filteredDataForEmployee:any=[]
  constructor(private service:ServiceService, private datePipe: DatePipe, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.PreWasteData = {
      unitID:'',
      productID:'',
      wasteDate:'',
      machineName:'',
      machineSpecification:'',
      partyName:'',
      address:'',
      wasteGivenBy:'',
      wasteRecievedBy:'',
      productBatch:'',
      type:'RAWMATERIAL',
      wipID:'',
      wasteQuantity:0,
      productId:'',
      wasteDiscription:'',
      productSpecification:'',
      wasteUnit:'',
      station:'',
      purpose:'',
      note:'',
    }
    this.PreWasteData.wasteDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.WorkingMachineBarcode=''
    this.ItemBarcode=''

    this.service.GetCustomer().subscribe((res:any)=>{
      console.log(res)
      this.partyName = res.data.data
      this.searchWaste();
    })

    this.service.GetEmployee().subscribe((res:any)=>{
      console.log(res)
      this.wasteGivenBy = res.data.data
      this.wasteRecievedBy = res.data.data
      this.searchWasteForEmployee();
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

  CreateWaste(item:any){
    this.service.CreateWaste(item).subscribe((res:any)=>{
      if (res.status==='SUCCESS'){
        location.reload();
      }
      this.message = res.message
      this.toastOpen(res.status)
      console.log(res)
    })
  }

  ScanWaste(wasteScanResult:any){
    this.service.ScanProduct(wasteScanResult).subscribe((res:any)=>{
      console.log(res)
      this.toastOpen(res.status)
      this.message = res.message
      this.PreWasteData.wasteDiscription = res.data?.productName
      this.PreWasteData.productBatch = res.data?.BatchInfo[0]?.productBatch
      this.PreWasteData.wasteQuantity = res.data?.BatchInfo[0]?.productQuantity
      this.PreWasteData.productSpecification = res.data?.productSpecification
      this.PreWasteData.wasteUnit = res.data?.unit
      this.PreWasteData.type = res.data?.type
      this.PreWasteData.productId = res.data?.BatchInfo[0]?.productId
      this.selection = res.data?.BatchInfo
      this.findById(res.data.BatchInfo[0].productId);
      this.ItemBarcode = res.data?.barcodeImageWithHTTP
    })
  }

  ScanWorkingMachine(WorkingMachineScanResult:any){
    this.service.ScanMachine(WorkingMachineScanResult).subscribe((res:any)=>{
      console.log(res,'machine')
      this.message = res.message
      this.toastOpen(res.status)
      this.PreWasteData.machineName = res.data?.productName
      this.PreWasteData.partyName = res.data?.partyName
      this.PreWasteData.address = res.data?.partyAddress
      this.PreWasteData.machineSpecification = res.data?.productSpecification
      this.PreWasteData.unitID = res.data.productUnitID
      this.PreWasteData.productID = res.data.productID
      this.PreWasteData.wipID = res.data.wipID
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
            this.ScanWaste(this.scanResult)
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
    this.PreWasteData.productBatch = i.productBatch;
    this.PreWasteData.wasteQuantity = i.productQuantity
    this.findById(i.productId);
  }

  handlepartyName(i:any) {
    this.customerText=''
    this.PreWasteData.partyName = i.customerName;
    this.modalCtrl.dismiss();
  }

  handlewasteUnit(i:any){
    this.PreWasteData.wasteUnit = i
  }

  searchWaste(){
    console.log(this.customerText)
    this.filteredData = this.partyName.filter((obj:any) => obj.customerName.toLocaleLowerCase().includes(this.customerText.toLocaleLowerCase()));
    console.log(this.filteredData)
  }

  searchWasteForEmployee(){
    console.log(this.employeeText)
    this.filteredDataForEmployee = this.wasteGivenBy.filter((obj:any) => obj.firstName.toLocaleLowerCase().includes(this.employeeText.toLocaleLowerCase()));
    console.log(this.filteredData)
  }

  handlewasteGivenBy(i:any) {
    this.employeeText=''
    this.PreWasteData.wasteGivenBy = i.firstName +" "+ i.lastName;
    this.modalCtrl.dismiss();
  }

  handlewasteRecievedBy(i:any) {
    this.employeeText=''
    this.PreWasteData.wasteRecievedBy = i.firstName +" "+ i.lastName;
    this.modalCtrl.dismiss();
  }

  handlestation(i:any){
    this.PreWasteData.station = i
  }

  findById(productId:any){
    this.service.GetOneItem(productId).subscribe((res:any)=>{
      this.PreWasteData.partyName = res.data?.invoiceInfo[0]?.partyName
      console.log(res)
    })
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

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

}
