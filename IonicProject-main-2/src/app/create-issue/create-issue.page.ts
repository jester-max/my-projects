import { Component, OnInit } from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {ServiceService} from "../service.service";
import {ModalController, ToastController} from "@ionic/angular";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.page.html',
  styleUrls: ['./create-issue.page.scss'],
  providers: [DatePipe]
})
export class CreateIssuePage implements OnInit {
  image:any=''
  WorkingMachineBarcode:any=''
  ItemBarcode:any=''
  PreIssueData:any
  selection:any=[]
  alertButtons = ['Cancel','Ok'];
  isToastOpen = false;
  class:any
  icon:any
  message:any
  toastButtons = [{text: 'Okay'}];

  issueBy:any=[]
  receivedBy:any=[]

  scanResult:any
  visiblity=''

  employeeText:any=''
  filteredData:any=[]

  issueUnit=['NOS','KILOGRAM','GRAM','METER','FIT','LITER','MILLI LITER']
  constructor(private service:ServiceService, private datePipe: DatePipe,private modalCtrl: ModalController) { }

  ngOnInit() {
    this.PreIssueData = {
      productIssueDate:'',
      productSubmitDate:'',
      inventoryID:'',
      productID:'',
      productUnitID:'',
      issueProduct: '',
      productSpecification:'',
      issueQuantity: 0,
      stockQuantity: 0,
      batchQuantity:0,
      issueUnit: '',
      issueBy:'',
      receivedBy:'',
      purpose:'',
      specification:'',
      type:'RAWMATERIAL',
      batch:'',
      note:'',
      location:''
    }
    this.PreIssueData.productIssueDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    this.WorkingMachineBarcode=''
    this.ItemBarcode=''

    this.service.GetEmployee().subscribe((res:any)=>{
      console.log(res)
      this.issueBy = res.data.data
      this.receivedBy = res.data.data
      this.searchIssue();
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

  // Function to convert DataURL to Blob
  dataURLToBlob(dataUrl:any) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  CreateIssue(item:any){
    const formData=new FormData();
    if (this.image) {
      const blob = this.dataURLToBlob(this.image);
      formData.append('goodImages', blob, 'captured-image.png');
    }
    // formData.append("issuegoodsfile", this.image);
    formData.append('type',item.type);
    formData.append('issueProduct',item.issueProduct);
    formData.append('inventoryID',item.inventoryID);
    formData.append('batch',item.batch);
    formData.append('productID',item.productID);
    formData.append('productUnitID',item.productUnitID);
    formData.append('productIssueDate',item.productIssueDate);
    formData.append('productSpecification',item.productSpecification);
    formData.append('issueUnit',item.issueUnit);
    formData.append('stockQuantity',item.stockQuantity);
    formData.append('batchQuantity',item.batchQuantity);
    formData.append('issueQuantity',item.issueQuantity);
    formData.append('issueBy',item.issueBy);
    formData.append('receivedBy',item.receivedBy);
    formData.append('purpose',item.purpose);
    formData.append('specification',item.specification);
    formData.append('note',item.note);
    this.service.CreateIssue(formData).subscribe((res:any)=>{
      if (res.status==='SUCCESS'){
        location.reload();
      }
      this.message = res.message
      this.setOpen(res.status)
    })
  }

  ScanIssue(itemScanResult:any){
    this.service.ScanProduct(itemScanResult).subscribe((res:any)=>{
      this.setOpen(res.status)
      this.message = res.message
      this.PreIssueData.issueProduct = res.data?.productName
      this.PreIssueData.stockQuantity = res.data?.productStock
      this.PreIssueData.type = res.data?.type
      this.PreIssueData.productSpecification = res.data?.productSpecification
      this.PreIssueData.issueUnit = res.data?.unit
      this.PreIssueData.inventoryID = res.data?.inventoryID
      this.PreIssueData.location = res.data?.location
      this.PreIssueData.note = res.data?.note
      this.PreIssueData.batch = res.data?.BatchInfo[0]?.productBatch
      this.PreIssueData.batchQuantity = res.data?.BatchInfo[0]?.productQuantity
      this.ItemBarcode = res.data?.barcodeImageWithHTTP
      this.selection = res.data?.BatchInfo
    })
  }

  ScanWorkingMachine(WorkingMachineScanResult:any){
    this.service.ScanMachine(WorkingMachineScanResult).subscribe((res:any)=>{
      this.setOpen(res.status)
      this.message = res.message
      this.PreIssueData.productUnitID = res.data.productUnitID
      this.PreIssueData.productID = res.data.productID
      this.PreIssueData.wipID = res.data.wipID
      this.PreIssueData.purpose = res.data.productName
      this.PreIssueData.specification = res.data.productSpecification
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
            this.ScanIssue(this.scanResult)
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
    this.PreIssueData.batch = i.productBatch;
    this.PreIssueData.batchQuantity = i.productQuantity
  }

  handleissueBy(i:any) {
    this.employeeText=''
    this.PreIssueData.issueBy = i.firstName +" "+ i.lastName;
    this.modalCtrl.dismiss();
  }

  searchIssue(){
    console.log(this.employeeText)
    this.filteredData = this.issueBy.filter((obj:any) => obj.firstName.toLocaleLowerCase().includes(this.employeeText.toLocaleLowerCase()));
    console.log(this.filteredData)
  }

  handlereceivedBy(i:any) {
    this.employeeText=''
    this.PreIssueData.receivedBy = i.firstName +" "+ i.lastName;
    this.modalCtrl.dismiss();
  }

  handleissueUnit(i:any){
    this.PreIssueData.issueUnit = i
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
