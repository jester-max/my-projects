import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {DatePipe} from "@angular/common";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

@Component({
  selector: 'app-get-tools',
  templateUrl: './get-tools.page.html',
  styleUrls: ['./get-tools.page.scss'],
  providers: [DatePipe]
})
export class GetToolsPage implements OnInit {

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
  GetItemData:any=[]
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

  filterWith='inventoryID'

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
    this.getItem();
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromDate = this.currentDate
    this.toDate = this.currentDate
  }

  setOpen(isOpen: any) {
    this.isModalOpen = isOpen;
  }

  getItem(){
    this.service.GetToolsItem(this.perPage,this.pageSize).subscribe((res:any)=>{
      console.log(res)
      this.message=res.message
      this.toastOpen(res.status)
      this.GetItemData = res.data.data
    })
  }

  paginateItem(event:any){
    setTimeout(() => {
      this.perPage++;
      console.log(this.perPage,this.pageSize)
      if (this.searchText===''){
        this.service.GetToolsItem(this.perPage,this.pageSize).subscribe((res:any)=>{
          this.GetItemData = this.GetItemData.concat(res.data.data)
          console.log(res)
          event.target.complete();
        })
      }else{
        this.service.SearchToolsItem(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
          this.GetItemData = this.GetItemData.concat(res.data.data)
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
      this.getItem();
      this.showList = false
    } else {
      this.service.SearchToolsItem(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
        console.log(res)
        this.GetItemData = res.data.data
        this.showList = false
      })
    }
  }

  oneSearch(searchText:any){
    this.searchText = searchText
    this.service.SearchToolsItem(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
      console.log(res)
      this.GetItemData = res.data.data
      this.showList = false
    })
  }

  getOneItem(isOpen: any,itemid:any){
    this.isModalOpen = isOpen;
    this.service.GetOneItem(itemid).subscribe((res:any)=>{
      this.message=res.message
      this.toastOpen(res.status)
      this.GetOneItemData = res.data
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

  handleVerifyStatus(filterStatus:any){
    this.filterText = filterStatus
    if (this.filterText==='SUCCESS'){
      //@ts-ignore
      document.getElementById('success-item').style.color='#0d6efd'
      //@ts-ignore
      document.getElementById('danger-item').style.color=''
      //@ts-ignore
      document.getElementById('warning-item').style.color=''
    } else if (this.filterText==='REJECT'){
      //@ts-ignore
      document.getElementById('success-item').style.color=''
      //@ts-ignore
      document.getElementById('danger-item').style.color='#0d6efd'
      //@ts-ignore
      document.getElementById('warning-item').style.color=''
    } else {
      //@ts-ignore
      document.getElementById('success-item').style.color=''
      //@ts-ignore
      document.getElementById('danger-item').style.color=''
      //@ts-ignore
      document.getElementById('warning-item').style.color='#0d6efd'
    }
    this.service.SearchItem(this.filterText, this.perPage, this.pageSize).subscribe((res: any) => {
      console.log(res)
      this.GetItemData = res.data.data
      this.showList = false
    })
  }

  dateFilter() {
    console.log(this.fromDate,this.toDate)
    this.service.DateFilterItem(this.fromDate,this.toDate).subscribe((res:any)=>{
      this.GetItemData = res.data
      if (this.GetItemData.length===0){
        this.message = 'DATA IS NOT AVAILABLE!'
        this.toastOpen('PENDING')
      }
      this.DateFilter = false
      console.log(this.GetItemData)
    })
  }
}
