import { Component, OnInit } from '@angular/core';
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {ServiceService} from "../service.service";
import {DatePipe} from "@angular/common";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
  providers: [DatePipe]
})
export class CreateItemPage implements OnInit {
  image:any=''
  PreItemData:any
  isToastOpen = false;
  class:any
  icon:any
  message:any
  toastButtons = [{text: 'Okay'}];

  scanResult:any
  visiblity=''

  location=['STORE', 'FRONT-GO-DOWN', 'BACK-GO-DOWN']
  unit=['NOS','KILOGRAM','GRAM','METER','FIT','LITER','MILLI LITER']
  partyName:any=[]
  customerText:any=''
  filteredData:any=[]
  constructor(private service:ServiceService, private datePipe: DatePipe, private modalCtrl: ModalController) { }

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

  ngOnInit() {
    this.PreItemData = {
      productName:'',
      returnable:'',
      date:'',
      unit:'',
      productSpecification:'',
      rate: 0,
      productQuantity: 0,
      CGST:0,
      SGST:0,
      IGST:0,
      type:'RAWMATERIAL',
      productLimit:10,
      purchaseBy:'MANAGER',
      receivedBy:'VICKY',
      note:'no special',
      invoiceInfo: [{invoiceId:'',invoiceNum:'',partyName:''}],
      location:''
    }
    this.PreItemData.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')

    this.service.GetVendor().subscribe((res:any)=>{
      this.partyName = res.data.data
      this.searchItem();
    })
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

  CreateItem(item:any){
    const formData=new FormData();
    if (this.image) {
      const blob = this.dataURLToBlob(this.image);
      formData.append('goodImages', blob, 'captured-image.png');
    }
    // formData.append("issuegoodsfile", this.image);
    formData.append('productName',this.PreItemData.productName);
    formData.append('returnable',this.PreItemData.returnable);
    formData.append('date',this.PreItemData.date);
    formData.append('unit',this.PreItemData.unit);
    formData.append('productSpecification',this.PreItemData.productSpecification);
    formData.append('rate',this.PreItemData.rate);
    formData.append('productQuantity',this.PreItemData.productQuantity);
    formData.append('CGST',this.PreItemData.CGST);
    formData.append('SGST',this.PreItemData.SGST);
    formData.append('IGST',this.PreItemData.IGST);
    formData.append('type',this.PreItemData.type);
    formData.append('productLimit',this.PreItemData.productLimit);
    formData.append('purchaseBy',this.PreItemData.purchaseBy);
    formData.append('receivedBy',this.PreItemData.receivedBy);
    formData.append('note',this.PreItemData.note);
    formData.append('invoiceId',this.PreItemData.invoiceInfo[0].invoiceId);
    formData.append('invoiceNum',this.PreItemData.invoiceInfo[0].invoiceNum);
    formData.append('partyName',this.PreItemData.invoiceInfo[0].partyName);
    formData.append('location',this.PreItemData.location);
    this.service.CreateItem(formData).subscribe((res:any)=>{
      if (res.status==='SUCCESS'){
        location.reload();
      }
      console.log(res)
      this.message = res.message
      this.setOpen(res.status)
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
            this.ScanItem(this.scanResult)
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

  ScanItem(itemScanResult:any){
    this.service.ScanProduct(itemScanResult).subscribe((res:any)=>{
      console.log(res)
      this.setOpen(res.status)
      this.message = res.message
      this.PreItemData.productName = res.data?.productName
      this.PreItemData.type = res.data?.type
      this.PreItemData.productSpecification = res.data?.productSpecification
      this.PreItemData.unit = res.data?.unit
      this.findById(res.data.BatchInfo[0].productId);
    })
  }

  findById(productId:any){
    this.service.GetOneItem(productId).subscribe((res:any)=>{
      this.PreItemData.CGST = res.data?.CGST
      this.PreItemData.SGST = res.data?.SGST
      this.PreItemData.IGST = res.data?.IGST
      this.PreItemData.productQuantity = res.data?.productQuantity
      this.PreItemData.rate = res.data?.rate
      this.PreItemData.invoiceInfo[0].partyName = res.data?.invoiceInfo[0].partyName
      console.log(res)
    })
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

  handleLocation(i:any) {
    this.PreItemData.location = i;
  }

  handlepartyName(i:any) {
    this.customerText=''
    this.PreItemData.invoiceInfo[0].partyName = i.venderName;
    this.modalCtrl.dismiss();
  }

  handleunit(i:any){
    this.PreItemData.unit = i
  }

  searchItem(){
    console.log(this.customerText)
    this.filteredData = this.partyName.filter((obj:any) => obj.venderName.toLocaleLowerCase().includes(this.customerText.toLocaleLowerCase()));
    console.log(this.filteredData)
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }
}
