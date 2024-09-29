import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {someFunction, someFunction2} from "../custome-tenant/custome";
import { ValidationFunction,ValidateFields } from './validate';

import {ServiceService} from "../service.service";
import {ActivatedRoute, Router} from "@angular/router";

import {NgToastService} from "ng-angular-popup";
import {CookieService} from "ngx-cookie-service";
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-custome-dashboard',
  templateUrl: './custome-dashboard.component.html',
  styleUrls: ['./custome-dashboard.component.css'],
})
export class CustomeDashboardComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]> | any;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | any;

  isChecked: boolean = false;
  returnValue:any
  data:any
  newarry:any=[]
  realdata:any = []
  forChange: any;
  allComplete: boolean = false;
  status:any | undefined
  version:any
  index:any
  length:any
  heading:any='Sale-Invoice'

  constructor(private service:ServiceService,
              private route:Router,
              private router:ActivatedRoute,
              private toast:NgToastService,
              private cookieService: CookieService){
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
      );
  }

  @ViewChild('build-area') elementRef: ElementRef | any;

  ngOnInit() {
    this.getSaleInvoice(this.heading)
  }

  //Sale Invoice
  getSaleInvoice(heading:any){
    this.heading = heading
    if (this.cookieService.get('PUBLISH')==='invoice'){
      this.service.getSaleInvoiceStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
        if (res.Status === 'SUCCESS') {
          this.data = someFunction2(res.data)
          // for (let item of this.data){
          //   this.realdata.push(item)
          // }
          this.version = res.version
          console.log(res)
          console.log(this.data)
        }
      })
    } else {
      this.service.getInvoice().subscribe((res:any)=>{
        this.data = someFunction(res.data).slice(1);
        // this.toast.success({detail:'Success Get'})
        if (res.Status === "SUCCESS"){
          this.toast.success({detail:res.Status,summary:'Successfully Getting the Service of ERP'})
        } else {
          this.toast.error({detail:'ERROR',summary:res.Status})
        }
        console.log(this.realdata)
        console.log(this.data,'main data')
      })
    }
  }

  postSaleInvoice(){
    if (this.cookieService.get('PUBLISH')==='invoice'){
      console.log(this.realdata)
      this.service.updateSaleInvoiceStructure(this.realdata,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS'){
          this.toast.success({detail:'Success',summary:res.Status})
          // this.route.navigate([''])
        } else {
          this.toast.error({detail: 'ERROR', summary: this.status.message})
        }
      })
    } else {
      console.log(this.realdata)
      this.service.postSaleInvoiceStructure(this.realdata,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        this.status = JSON.parse(res.error)
        console.log(this.status)
        if (res.Status === 'SUCCESS'){
          this.toast.success({detail:'Success',summary:res.Status})
          // this.route.navigate([''])
          // this.cookieService.delete('PUBLISH')
        } else if (res.Status === 'ERROR'){
          this.toast.error({detail:'Error',summary:this.status.message})
        }
      })
    }
  }

  //Sale Quatation
  getSaleQuatation(heading:any){
    this.heading = heading
    this.data=[]
    this.realdata=[]
    this.forChange=false
    this.service.getSaleQuatationStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      if (res.Status === 'SUCCESS') {
        this.data = someFunction2(res.data)
        // for (let item of this.data){
        //   this.realdata.push(item)
        // }
        this.version = res.version
        console.log(res)
        console.log(this.data)
      }
    })
  }

  postSaleQuatation(){
    if (this.cookieService.get('PUBLISH')==='invoice'){
      console.log(this.realdata)
      this.service.updateSaleQuotationStructure(this.realdata,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS'){
          this.toast.success({detail:'Success',summary:res.Status})
          // this.cookieService.delete('PUBLISH')
          // this.route.navigate([''])
        } else {
          this.toast.error({detail: 'ERROR', summary: this.status.message})
        }
      })
    } else {
      console.log(this.realdata)
      this.service.postSaleQuatationStructure(this.realdata, this.router.snapshot.params['_id']).subscribe((res: any) => {
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS') {
          this.toast.success({detail: 'Success', summary: res.Status})
          // this.route.navigate([''])
          // this.cookieService.delete('PUBLISH')
        } else if (res.Status === 'ERROR') {
          this.toast.error({detail: 'Error', summary: this.status.message})
        }
      })
    }
  }

  //Sale Transport
  getSaleTransport(heading:any){
    this.heading = heading
    this.data=[]
    this.realdata=[]
    this.service.getSaleTransportStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      if (res.Status === 'SUCCESS') {
        this.data = someFunction2(res.data)
        // for (let item of this.data){
        //   this.realdata.push(item)
        // }
        this.version = res.version
        console.log(res)
        console.log(this.data)
      }
    })
  }

  postSaleTransport(){
    if (this.cookieService.get('PUBLISH')==='invoice'){
      console.log(this.realdata)
      this.service.updateSaleTransportStructure(this.realdata,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS'){
          this.toast.success({detail:'Success',summary:res.Status})
          // this.cookieService.delete('PUBLISH')
          // this.route.navigate([''])
        } else {
          this.toast.error({detail: 'ERROR', summary: this.status.message})
        }
      })
    } else {
      console.log(this.realdata, 'transport')
      this.service.postSaleTransportStructure(this.realdata, this.router.snapshot.params['_id']).subscribe((res: any) => {
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS') {
          this.toast.success({detail: 'Success', summary: res.Status})
          // this.route.navigate([''])
          // this.cookieService.delete('PUBLISH')
        } else if (res.Status === 'ERROR') {
          this.toast.error({detail: 'Error', summary: this.status.message})
        }
      })
    }
  }

  //Purchase Quatation
  getPurchaseQuatation(heading:any){
    this.heading = heading
    this.data=[]
    this.realdata=[]
    this.service.getpurchaseQuatationStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      if (res.Status === 'SUCCESS') {
        this.data = someFunction2(res.data)
        // for (let item of this.data){
        //   this.realdata.push(item)
        // }
        this.version = res.version
        console.log(res)
        console.log(this.data)
      }
    })
  }

  postPurchaseQuatation(){
    if (this.cookieService.get('PUBLISH')==='invoice'){
      console.log(this.realdata)
      this.service.updatePurchaseQuatationStructure(this.realdata,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS'){
          this.toast.success({detail:'Success',summary:res.Status})
          // this.route.navigate([''])
        } else {
          this.toast.error({detail: 'ERROR', summary: this.status.message})
        }
      })
    } else {
      console.log(this.realdata, 'purchase-quotation')
      this.service.postPurchaseQuatationStructure(this.realdata, this.router.snapshot.params['_id']).subscribe((res: any) => {
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS') {
          this.toast.success({detail: 'Success', summary: res.Status})
          // this.route.navigate([''])
        } else if (res.Status === 'ERROR') {
          this.toast.error({detail: 'Error', summary: this.status.message})
        }
      })
    }
  }

  //Purchase Invoice
  getPurchaseInvoice(heading:any){
    this.heading = heading
    this.data=[]
    this.realdata=[]
    this.service.getPurchaseInvoiceStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      if (res.Status === 'SUCCESS') {
        this.data = someFunction2(res.data)
        // for (let item of this.data){
        //   this.realdata.push(item)
        // }
        this.version = res.version
        console.log(res)
        console.log(this.data)
      }
    })
  }

  postPurchaseInvoice(){
    if (this.cookieService.get('PUBLISH')==='invoice'){
      console.log(this.realdata)
      this.service.updatePurchaseInvoiceStructure(this.realdata,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS'){
          this.toast.success({detail:'Success',summary:res.Status})
          // this.route.navigate([''])
        } else {
          this.toast.error({detail: 'ERROR', summary: this.status.message})
        }
      })
    } else {
      console.log(this.realdata, 'purchase-invoice')
      this.service.postPurchaseInvoiceStructure(this.realdata, this.router.snapshot.params['_id']).subscribe((res: any) => {
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS') {
          this.toast.success({detail: 'Success', summary: res.Status})
          // this.route.navigate([''])
        } else if (res.Status === 'ERROR') {
          this.toast.error({detail: 'Error', summary: this.status.message})
        }
      })
    }
  }

  //Customer
  getCustomer(heading:any){
    this.heading = heading
    this.data=[]
    this.realdata=[]
    this.service.getCustomerStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      if (res.Status === 'SUCCESS') {
        this.data = someFunction2(res.data)
        // for (let item of this.data){
        //   this.realdata.push(item)
        // }
        this.version = res.version
        console.log(res)
        console.log(this.data)
      }
    })
  }

  postCustomer(){
    if (this.cookieService.get('PUBLISH')==='invoice'){
      console.log(this.realdata)
      this.service.updateCustomerStructure(this.realdata,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS'){
          this.toast.success({detail:'Success',summary:res.Status})
          // this.route.navigate([''])
        } else {
          this.toast.error({detail: 'ERROR', summary: this.status.message})
        }
      })
    } else {
      console.log(this.realdata, 'customer')
      this.service.postCustomerStructure(this.realdata, this.router.snapshot.params['_id']).subscribe((res: any) => {
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS') {
          this.toast.success({detail: 'Success', summary: res.Status})
          // this.route.navigate([''])
        } else if (res.Status === 'ERROR') {
          this.toast.error({detail: 'Error', summary: this.status.message})
        }
      })
    }
  }

  //Employee
  getEmployee(heading:any){
    this.heading = heading
    this.data=[]
    this.realdata=[]
    this.service.getEmployeeStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      if (res.Status === 'SUCCESS') {
        this.data = someFunction2(res.data)
        // for (let item of this.data){
        //   this.realdata.push(item)
        // }
        this.version = res.version
        console.log(res)
        console.log(this.data)
      }
    })
  }

  postEmployee(){
    if (this.cookieService.get('PUBLISH')==='invoice'){
      console.log(this.realdata)
      this.service.updateEmployeeStructure(this.realdata,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS'){
          this.toast.success({detail:'Success',summary:res.Status})
          // this.route.navigate([''])
        } else {
          this.toast.error({detail: 'ERROR', summary: this.status.message})
        }
      })
    } else {
      console.log(this.realdata, 'employee')
      this.service.postEmployeeStructure(this.realdata, this.router.snapshot.params['_id']).subscribe((res: any) => {
        console.log(res.error)
        this.status = JSON.parse(res.error)
        if (res.Status === 'SUCCESS') {
          this.toast.success({detail: 'Success', summary: res.Status})
          // this.route.navigate([''])
        } else if (res.Status === 'ERROR') {
          this.toast.error({detail: 'Error', summary: this.status.message})
        }
      })
    }
  }

  complete(){
    this.service.updateConfig("",this.router.snapshot.params['_id']).subscribe((res:any)=>{
      this.route.navigate([''])
      this.cookieService.delete('PUBLISH')
      console.log(res)
    })
  }

  blank(){
  this.data=[]
  this.realdata=[]
  this.forChange=false
  }

  postV(value:any,event:any,index:any) {
    console.log(value,event,index)
    if (event.checked){
      this.forChange = value
      console.log(new Date(value.default))
      this.realdata.push(value)
      console.log(this.realdata.length,index)
      this.index = index
    } else {
      console.log(this.realdata)
      this.realdata.splice(index, 1)
      this.forChange=false
      this.length = this.realdata.length
      console.log(this.realdata,"not allowed")
    }
  }

  change(value:any,index:any) {
    console.log(value,index)
      this.forChange = value
      this.length = this.realdata.length
      console.log(this.realdata.length,index)
      this.index = index
  }

  postArray(value:any,event:any) {
    if (event.checked){
      this.forChange = value
    }
  }

  Open(value:any){
    console.log(value)
    this.forChange = value
    this.forChange = true
  }

  someComplete(): boolean {
    if (this.data.subtasks == null) {
      return false;
    }
    return this.data.subtasks.filter((t:any) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.data.subtasks == null) {
      return;
    }
    this.data.subtasks.forEach((t:any) => (t.completed = completed));
  }

  draggableElements = [
    {key:'New Field Text',type:'string',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},

    {key:'New Field Number',type:'number',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:0,required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},

    {key:'New Field Date',type:'date',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'2024-01-09',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},

    {key:'New Field Email',type:'email',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'xyz@gmail.com',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},

    {key:'New Array',value:[

        {key:'New Array Field Text',type:'string',relation:'array',belong:'New Array',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},
        {key:'New Array Field Number',type:'number',relation:'array',belong:'New Array',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          default:0,required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},
        {key:'New Array Field Date',type:'date',relation:'array',belong:'New Array',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          default:0,required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},
        {key:'New Array Field Email',type:'email',relation:'array',belong:'New Array',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          default:'xyz@gmail.com',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'}

      ],type:'array',relation:'array',belong:'New Array',isArray:true,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:"NA",required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},

    // {key:'New Object',value:[
    //
    //     {key:'New Object Field Text',type:'string',relation:'object',belong:'New Object',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
    //       default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
    //       autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},
    //     {key:'New Object Field Number',type:'number',relation:'object',belong:'New Object',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
    //       default:0,required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
    //       autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},
    //     {key:'New Object Field Date',type:'date',relation:'object',belong:'New Object',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
    //       default:0,required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
    //       autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'},
    //     {key:'New Object Field Email',type:'email',relation:'object',belong:'New Object',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
    //       default:'xyz@gmail.com',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
    //       autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'}]
    //   ,type:'array',relation:'object',belong:'New Object',isArray:true,primarykey:false,fkey:false,ckey:false,uppercase:false,
    //   default:"NA",required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
    //   autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new'}
    // Add more form elements as needed
  ];

  onDragStart(event: DragEvent, element: any) {
    console.log(event,element)
    event.dataTransfer?.setData('text/plain', JSON.stringify(element));
  }

  ondrop(event: DragEvent) {
    event.preventDefault();
    const elementData = event.dataTransfer?.getData('text/plain');
    if (elementData) {
      const element = JSON.parse(elementData);
      this.addElementToForm(element);
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
    // event.stopPropagation();
  }

  addElementToForm(element: any) {
    this.data.push(element)
    this.newarry = this.data
    console.log(this.data)
  }

  Done(forChange: any) {
    console.log(forChange,'done')
    ValidateFields(forChange)
    this.forChange=false
    // for (let forChangeKey in this.realdata) {
    //   this.length = forChangeKey
    // }
    this.length = this.realdata.length
    console.log(this.length)
  }

  moveToBin(forChange: any) {
    this.data.shift(forChange)
    this.forChange=false
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.forChange.enumValues.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.forChange.enumValues.indexOf(fruit);
    if (index >= 0) {
      this.forChange.enumValues.splice(index, 1);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.forChange.enumValues.filter((fruit: string) => fruit.toLowerCase().includes(filterValue));
  }

}


