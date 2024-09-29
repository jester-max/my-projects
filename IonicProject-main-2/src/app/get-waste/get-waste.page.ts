import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-get-waste',
  templateUrl: './get-waste.page.html',
  styleUrls: ['./get-waste.page.scss'],
  providers: [DatePipe]
})
export class GetWastePage implements OnInit {

  results:any
  showList: any = false;

  isModalOpen:any = false;

  alertButtons = ['Cancel','Delete'];

  image:any

  // for the get item from database
  GetWasteData:any
  GetOneWasteData:any

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

  filterWith='wasteID'

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
    this.getWaste();
    this.statusWaste();
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromDate = this.currentDate
    this.toDate = this.currentDate
  }

  setOpen(isOpen: any) {
    this.isModalOpen = isOpen;
  }

  getWaste(){
    this.service.GetWaste(this.perPage,this.pageSize).subscribe((res:any)=>{
      this.message=res.message
      this.toastOpen(res.status)
      this.GetWasteData = res.data.data
      console.log(res)
    })
  }

  statusWaste(){
    this.service.StatusWaste().subscribe((res:any)=>{
      console.log(res)
      this.approved = res.data?.successData
      this.pending = res.data?.warningData
      this.rejected = res.data?.dangerData
    })
  }

  paginateItem(event:any){
    setTimeout(() => {
      this.perPage++;
      console.log(this.perPage,this.pageSize)
      if (this.searchText===''){
        this.service.GetWaste(this.perPage,this.pageSize).subscribe((res:any)=>{
          console.log(res)
          this.GetWasteData = this.GetWasteData.concat(res.data.data)
          event.target.complete();
        })
      } else {
        this.service.SearchItem(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
          this.GetWasteData = this.GetWasteData.concat(res.data.data)
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
      this.getWaste();
      this.showList = false
    } else {
      this.service.SearchWaste(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
        console.log(res)
        this.results = res.data.data
        this.showList = true
      })
    }
  }

  oneSearch(searchText:any){
    this.searchText = searchText
    this.service.SearchWaste(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
      console.log(res)
      this.GetWasteData = res.data.data
      this.showList = false
    })
  }

  getOneWaste(isOpen: any,itemid:any){
    this.isModalOpen = isOpen;
    this.service.GetOneItem(itemid).subscribe((res:any)=>{
      this.message=res.message
      this.toastOpen(res.status)
      this.GetOneWasteData = res.data
      console.log(res)
    })
  }

  stop(reason:any,wasteID:any,status:any){
    var rejection = { varifyProductStatus: status, reason: reason, wasteID:wasteID }
    console.log(rejection)
    this.service.RejectWaste(rejection).subscribe((res:any)=>{
      this.rejectedStatus = res.message
      if (res.status === 'SUCCESS'){
        location.reload()
      }else {
        this.service.toastSuccess(res)
      }
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
      this.approved = 0
      this.pending = 0
      this.rejected = 0
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
      document.getElementById('success-waste').style.color='#0d6efd'
      //@ts-ignore
      document.getElementById('danger-waste').style.color=''
      //@ts-ignore
      document.getElementById('warning-waste').style.color=''
    } else if (this.filterText==='REJECT'){
      //@ts-ignore
      document.getElementById('success-waste').style.color=''
      //@ts-ignore
      document.getElementById('danger-waste').style.color='#0d6efd'
      //@ts-ignore
      document.getElementById('warning-waste').style.color=''
    } else {
      //@ts-ignore
      document.getElementById('success-waste').style.color=''
      //@ts-ignore
      document.getElementById('danger-waste').style.color=''
      //@ts-ignore
      document.getElementById('warning-waste').style.color='#0d6efd'
    }
    this.service.SearchWaste(this.filterText, this.perPage, this.pageSize).subscribe((res: any) => {
      console.log(res)
      this.GetWasteData = res.data.data
      this.showList = false
    })
  }

  dateFilter() {
    console.log(this.fromDate,this.toDate)
    this.service.DateFilterWaste(this.fromDate,this.toDate).subscribe((res:any)=>{
      console.log(res)
      this.GetWasteData = res.data
    })
  }
}

