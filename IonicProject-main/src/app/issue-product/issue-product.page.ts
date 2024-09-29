import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {concat} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-issue-product',
  templateUrl: './issue-product.page.html',
  styleUrls: ['./issue-product.page.scss'],
  providers: [DatePipe]
})
export class IssueProductPage implements OnInit {
 Data:any

  results:any
  showList: any = false;

  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    // this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  isModalOpen:any = false;

  setOpen(isOpen: any) {
    this.isModalOpen = isOpen;
  }

  alertButtons = ['Cancel','Delete'];

  image:any

  // for the get item from database
  GetIssueData:any
  GetOneIssueData:any

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

  filterWith='issueId'

  rejectedStatus:any
  filterText:any=''

  fromDate:any
  toDate:any
  currentDate:any
  constructor(private service:ServiceService,private router:Router,public ActiveRouter:ActivatedRoute,private datePipe: DatePipe) { }

  ngOnInit() {
    this.getIssue();
    this.statusIssue();
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fromDate = this.currentDate
    this.toDate = this.currentDate
  }

  getIssue(){
    this.service.GetIssue(this.perPage,this.pageSize).subscribe((res:any)=>{
      this.message=res.message
      this.toastOpen(res.status)
      this.GetIssueData = res.data.data
      console.log(res)
    })
  }

  statusIssue(){
    this.service.StatusIssue().subscribe((res:any)=>{
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
        this.service.GetIssue(this.perPage,this.pageSize).subscribe((res:any)=>{
          this.GetIssueData = this.GetIssueData.concat(res.data.data)
          console.log(res)
          event.target.complete();
        })
      } else {
        this.service.SearchIssue(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
          this.GetIssueData = this.GetIssueData.concat(res.data.data)
          console.log(res)
          event.target.complete();
        })
      }
    }, 1000);
  }

  searchIssue(searchText:any) {
    console.log(searchText)
    this.searchText = searchText
    if (this.searchText === '') {
      this.perPage=1
      this.pageSize=20
      this.getIssue();
      this.showList = false
    } else {
      this.service.SearchIssue(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
        console.log(res.data)
        this.GetIssueData = res.data.data
        this.showList = false
      })
    }
  }

  oneSearch(searchText:any){
    this.searchText = searchText
    this.service.SearchIssue(this.searchText, this.perPage, this.pageSize).subscribe((res: any) => {
      this.GetIssueData = res.data.data
      this.showList = false
    })
  }

  getOneIssue(isOpen: any,itemid:any){
    this.isModalOpen = isOpen;
    this.service.GetOneIssue(itemid).subscribe((res:any)=>{
      this.GetOneIssueData = res.data
      this.message=res.message
      this.toastOpen(res.status)
      console.log(res)
    })
  }

  stop(reason:any,issueId:any,status:any){
    var rejection = { varifyProductStatus: status, reason: reason, issueId:issueId }
    this.service.RejectIssue(rejection).subscribe((res:any)=>{
      this.rejectedStatus = res.message
      if (res.status === 'SUCCESS'){
        location.reload();
      } else {
        this.service.toastSuccess(res)
      }
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
    console.log(this.filterText)
    if (this.filterText==='SUCCESS'){
      //@ts-ignore
      document.getElementById('success-issue').style.color='#0d6efd'
      //@ts-ignore
      document.getElementById('danger-issue').style.color=''
      //@ts-ignore
      document.getElementById('warning-issue').style.color=''
    } else if (this.filterText==='REJECT'){
      //@ts-ignore
      document.getElementById('success-issue').style.color=''
      //@ts-ignore
      document.getElementById('danger-issue').style.color='#0d6efd'
      //@ts-ignore
      document.getElementById('warning-issue').style.color=''
    } else {
      //@ts-ignore
      document.getElementById('success-issue').style.color=''
      //@ts-ignore
      document.getElementById('danger-issue').style.color=''
      //@ts-ignore
      document.getElementById('warning-issue').style.color='#0d6efd'
    }
    this.service.SearchIssue(this.filterText, this.perPage, this.pageSize).subscribe((res: any) => {
      this.GetIssueData = res.data.data
      this.showList = false
    })
  }

  dateFilter() {
    console.log(this.fromDate,this.toDate)
    this.service.DateFilterIssue(this.fromDate,this.toDate).subscribe((res:any)=>{
      console.log(res)
      this.GetIssueData = res.data
    })
  }
}
