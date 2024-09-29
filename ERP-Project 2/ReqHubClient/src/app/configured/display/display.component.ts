import { Component } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {someFunction2,someFunction} from "../../../assets/configuredSchema";
import {ActivatedRoute, Router} from "@angular/router";
import {StructureService} from "../structure.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {

  isActive:boolean=false
  length = 50;
  disabled = false;
  pageNumber: number = 1
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [50,100,250,500,1000];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  goPage:any
  searchStr: any = ''

  getData:any=[]

  data:any
  Data:any=[]

  constructor(public router:ActivatedRoute,
              private service:StructureService,
              private route:Router,
              private cookieService: CookieService) {}

  ngOnInit():void{
    this.service.getSaleInvoiceStructure(this.router.snapshot.params['token']).subscribe((res:any)=>{
      if (res.status === "SUCCESS"){
        // this.toast.success({detail:'Success',summary:res.Status})
        this.data = someFunction2(res.data)
        for (let i = this.data.length - 1; i >= 0; i--) {
          if (this.data[i].type === 'array') {
            this.data[i].value.splice(0, 1);
            this.Data.push(this.data[i]);
            this.data.splice(i, 1);
          }else if (this.data[i].key==='_id' || this.data[i].key==='__v'){
            this.data.splice(i, 1);
          }
        }
        console.log(this.data)
      }else{
        // this.toast.error({detail:'Error',summary:res.error})
      }
    })


    this.service.getSaleInvoice(this.pageSize,this.pageNumber,this.searchStr,this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res.data)
      if (res.status === "SUCCESS"){
        for (let i = 0; i < res.data.length; i++) {
          this.getData.push(someFunction(res?.data[i]))
        }
        console.log(this.getData)
      }else{
        // this.toast.error({detail:'Error',summary:res.error})
      }
    })
  }

  search(e: any) {
    const searchInput = document.querySelector(".searchInput");
    // @ts-ignore
    const input = searchInput.querySelector("input");
    // @ts-ignore
    const resultBox = searchInput.querySelector(".resultBox");
    // @ts-ignore
    const icon = searchInput.querySelector(".icon");
    // @ts-ignore
    let linkTag = searchInput.querySelector("a");
    this.searchStr = e.target.value; //user enetered data
    if(this.searchStr){

      // @ts-ignore
      // searchInput.classList.add("active"); //show autocomplete box

      // @ts-ignore
      let allList = resultBox.querySelectorAll("li");
      for (let i = 0; i < allList.length; i++) {
        //adding onclick attribute in all li tag
        allList[i].setAttribute("onclick", "select(this)");
      }
    }else{
      this.ngOnInit();
      // @ts-ignore
      searchInput.classList.remove("active"); //hide autocomplete box
    }
  }

  activeFilters(status:any){
    this.searchStr=''
    this.isActive = !this.isActive
    const searchInput = document.querySelector(".searchInput");
    if (this.isActive){
      // @ts-ignore
      searchInput.classList.add("active");
    } else {
      // @ts-ignore
      searchInput.classList.remove("active");
    }
  }

  hideFilters(){
    const searchInput = document.querySelector(".searchInput");
    // @ts-ignore
    searchInput.classList.remove("active");
  }

  searchFiltered(){
    console.log('search-filter-api')
  }

  // pagination start
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    if(e.pageIndex==0){
      this.pageNumber = 1
    }else{
      this.pageNumber= e.pageIndex+1
    }
    if(this.searchStr==''&&!this.isActive){

    }else if (!this.isActive){
      //search apis
      console.log('search-api')
    } else {
      this.searchFiltered()
    }
  }

  // go function implement
  Goto(){
  }
}
