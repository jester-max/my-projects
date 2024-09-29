import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {DatePipe} from "@angular/common";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

@Component({
  selector: 'app-get-payments',
  templateUrl: './get-payments.page.html',
  styleUrls: ['./get-payments.page.scss'],
  providers: [DatePipe]
})
export class GetPaymentsPage implements OnInit {
  results:any
  showList: any = false;

  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  isModalOpen:any = false;

  alertButtons = ['Cancel','Delete'];

  image:any

  // for the get item from database
  GetCustomerAccountData:any=[]
  GetOneItemData:any

  // for the pagination
  perPage:any=1
  pageSize:any=20

  // for the search
  searchText:any=''

  // for the count status
  approved:any=0
  pending:any=0
  rejected:any=0

  // for the toast status
  isToastOpen = false;
  class:any
  icon:any
  message:any
  toastButtons = [{text: 'Okay'}];

  filterWith='customerName'

  rejectedStatus:any
  filterText:any=''

  fromDate:any
  toDate:any
  currentDate:any
  DateFilter:any=true
  constructor(private service:ServiceService, private datePipe: DatePipe) { }

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

  ngOnInit():void{
    this.getCustomerAccount();
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromDate = this.currentDate
    this.toDate = this.currentDate
  }

  setOpen(isOpen: any) {
    this.isModalOpen = isOpen;
  }

  getCustomerAccount(){
    this.service.findCustomerReport(this.perPage,this.pageSize).subscribe((res:any)=>{
      console.log(res)
      this.message=res.message
      this.toastOpen(res.status)
      this.GetCustomerAccountData = res.data.data
    })
  }

  paginateItem(event:any){
    setTimeout(() => {
      this.perPage++;
      console.log(this.perPage,this.pageSize)
      if (this.searchText===''){
        this.service.findCustomerReport(this.perPage,this.pageSize).subscribe((res:any)=>{
          this.GetCustomerAccountData = this.GetCustomerAccountData.concat(res.data.data)
          console.log(res)
          event.target.complete();
        })
      }else{
        this.service.searchCustomerAccount(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
          this.GetCustomerAccountData = this.GetCustomerAccountData.concat(res.data.data)
          console.log(res)
          event.target.complete();
        })
      }
    }, 1000);
  }

  searchItem(searchText:any) {
    this.searchText = searchText
    if (this.searchText === '') {
      this.perPage=1
      this.pageSize=20
      this.getCustomerAccount();
      this.showList = false
    } else {
      this.service.searchCustomerAccount(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
        console.log(res)
        this.results = res.data.data
        this.showList = true
      })
    }
  }

  oneSearch(searchText:any){
    this.searchText = searchText
    this.service.searchCustomerAccount(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
      console.log(res)
      this.GetCustomerAccountData = res.data.data
      this.showList = false
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
      location.reload();
      event.target.complete();
    }, 2000);
  }

  handleChange(filterText:any) {
    this.filterWith = filterText
  }

  dateFilter() {
    console.log(this.fromDate,this.toDate)
    this.service.DateFilterItem(this.fromDate,this.toDate).subscribe((res:any)=>{
      this.GetCustomerAccountData = res.data
      if (this.GetCustomerAccountData.length===0){
        this.message = 'DATA IS NOT AVAILABLE!'
        this.toastOpen('PENDING')
      }
      this.DateFilter = false
      console.log(this.GetCustomerAccountData)
    })
  }
}
