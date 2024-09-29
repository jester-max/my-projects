import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-get-time',
  templateUrl: './get-time.page.html',
  styleUrls: ['./get-time.page.scss'],
  providers: [DatePipe]
})
export class GetTimePage implements OnInit {

  results:any
  showList: any = false;

  isModalOpen:any = false;

  alertButtons = ['Cancel','Delete'];

  image:any

  // for the get item from database
  GetTimeData:any
  GetOneTimeData:any

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

  filterWith='timeID'

  rejectedStatus:any
  filterText:any=''

  fromDate:any
  toDate:any
  currentDate:any
  constructor(private service:ServiceService,private datePipe: DatePipe) { }

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
    this.getTime();
    this.statusTime();
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromDate = this.currentDate
    this.toDate = this.currentDate
  }

  setOpen(isOpen: any) {
    this.isModalOpen = isOpen;
  }

  getTime(){
    this.service.GetTime(this.perPage,this.pageSize).subscribe((res:any)=>{
      this.message=res.message
      this.GetTimeData = res.data.data
      this.toastOpen(res.status)
      console.log(res)
    })
  }

  statusTime(){
    this.service.StatusTime().subscribe((res:any)=>{
      console.log(res)
      this.approved = res.data?.successData
      this.pending = res.data?.warningData
      this.rejected = res.data?.dangerData
    })
  }

  paginateItem(event:any){
    setTimeout(() => {
      this.perPage++;
      if (this.searchText===''){
        this.service.GetTime(this.perPage,this.pageSize).subscribe((res:any)=>{
          this.GetTimeData = this.GetTimeData.concat(res.data.data)
          console.log(res)
          event.target.complete();
        })
      } else {
        this.service.SearchTime(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
          this.GetTimeData = this.GetTimeData.concat(res.data.data)
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
      this.getTime();
      this.showList = false
    } else {
      this.service.SearchTime(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
        this.GetTimeData = res.data.data
        console.log(res)
        this.showList = false
      })
    }
  }

  oneSearch(searchText:any){
    this.searchText = searchText
    this.service.SearchTime(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
      console.log(res)
      this.GetTimeData = res.data.data
      this.showList = false
    })
  }

  getOneTime(isOpen: any,itemid:any){
    this.isModalOpen = isOpen;
    this.service.GetOneTime(itemid).subscribe((res:any)=>{
      this.message=res.message
      this.toastOpen(res.status)
      this.GetOneTimeData = res.data
      console.log(res)
    })
  }

  stop(reason:any,timeId:any,status:any){
    var rejection = { varifyProductStatus: status, reason: reason, timeID:timeId }
    this.service.RejectTime(rejection).subscribe((res:any)=>{
      this.rejectedStatus = res.message
      console.log(res)
      if (res.status === 'SUCCESS'){
        location.reload();
      } else {
        this.service.toastSuccess(res)
      }
    })
  }

  toastOpen(isOpen: any) {
    console.log(isOpen)
    this.isToastOpen = false;
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

  handleVerifyStatus(filterStatus:any){
    this.filterText = filterStatus
    if (this.filterText==='SUCCESS'){
      //@ts-ignore
      document.getElementById('success-time').style.color='#0d6efd'
      //@ts-ignore
      document.getElementById('danger-time').style.color=''
      //@ts-ignore
      document.getElementById('warning-time').style.color=''
    } else if (this.filterText==='REJECT'){
      //@ts-ignore
      document.getElementById('success-time').style.color=''
      //@ts-ignore
      document.getElementById('danger-time').style.color='#0d6efd'
      //@ts-ignore
      document.getElementById('warning-time').style.color=''
    } else {
      //@ts-ignore
      document.getElementById('success-time').style.color=''
      //@ts-ignore
      document.getElementById('danger-time').style.color=''
      //@ts-ignore
      document.getElementById('warning-time').style.color='#0d6efd'
    }
    this.service.SearchTime(this.filterText, this.perPage, 200).subscribe((res: any) => {
      this.GetTimeData = res.data.data
      this.showList = false
    })
  }

  dateFilter() {
    console.log(this.fromDate,this.toDate)
    this.service.DateFilterTime(this.fromDate,this.toDate).subscribe((res:any)=>{
      this.GetTimeData = res.data
    })
  }
}
