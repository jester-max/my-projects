import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {someFunction, someFunction2} from "../custome-tenant/custome";
import { ValidationFunction,ValidateFields,CanComponentDeactivate } from './validate';

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

import {BubbleDataPoint, Chart, ChartConfiguration, ChartTypeRegistry, Point, registerables} from "chart.js";

Chart.register(...registerables);
import interact from 'interactjs';

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
  returnValue: any
  data: any = []
  newarry: any = []
  realdata: any = []
  forChange: any;
  allComplete: boolean = false;
  status: any | undefined
  version: any
  index: any
  length: any
  heading: any = 'Sale-Invoice'
  serviceData: any

  charts: ChartConfiguration[] = [
    {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Series A',
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Series B',
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    },
    {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Series A',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          },
          {
            label: 'Series B',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    },
    {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },
      options: {
        responsive: true
      }
    },
    {
      type: 'doughnut',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },
      options: {
        responsive: true
      }
    },
    {
      type: 'radar',
      data: {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
          {
            label: 'Series A',
            data: [65, 59, 90, 81, 56, 55, 40],
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff'
          },
          {
            label: 'Series B',
            data: [28, 48, 40, 19, 96, 27, 100],
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff'
          }
        ]
      },
      options: {
        responsive: true
      }
    },
    {
      type: 'polarArea',
      data: {
        labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
        datasets: [
          {
            data: [11, 16, 7, 3, 14],
            backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
          }
        ]
      },
      options: {
        responsive: true
      }
    }
  ];

  constructor(private service: ServiceService,
              private route: Router,
              private router: ActivatedRoute,
              private toast: NgToastService,
              private cookieService: CookieService,
              private renderer: Renderer2) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }

  @ViewChild('build-area') elementRef: ElementRef | any;
  @ViewChild('buildArea', {static: false}) buildArea!: ElementRef;

  draggedChartConfig: ChartConfiguration | null = null;
  chartsMap = new Map<HTMLCanvasElement, Chart>();
  selectedCharts: any;


  onDragStartDash(event: DragEvent, chartConfig: ChartConfiguration): void {
    this.draggedChartConfig = chartConfig;
    event.dataTransfer?.setData('text', JSON.stringify(chartConfig));
  }

  allowDropDash(event: DragEvent): void {
    event.preventDefault();
  }

  onDropDash(event: DragEvent): void {
    event.preventDefault();
    this.selectedCharts = this.draggedChartConfig
    console.log(this.selectedCharts)
    if (this.draggedChartConfig) {
      const container = document.createElement('div');
      container.style.position = 'relative';

      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 400;
      canvas.draggable = true;
      canvas.style.border = '1px solid gainsboro';
      canvas.style.padding = '20px';
      canvas.style.borderRadius = '25px';

      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'fas fa-trash-alt';
      deleteIcon.style.position = 'absolute';
      deleteIcon.style.top = '25px';
      deleteIcon.style.right = '10px';
      deleteIcon.style.cursor = 'pointer';
      deleteIcon.addEventListener('click', () => {
        container.remove();
        this.chartsMap.delete(canvas);
        this.selectedCharts = false
      });

      /*const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.style.position = 'absolute';
      checkbox.style.top = '10px';
      checkbox.style.left = '10px';
      console.log(this.draggedChartConfig)
      checkbox.addEventListener('change', () => {
        console.log(this.draggedChartConfig)
        if (checkbox.checked) {
          this.selectedCharts.push(this.draggedChartConfig!);
        } else {
          this.selectedCharts = this.selectedCharts.filter((chart: ChartConfiguration<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown> | null) => chart !== this.draggedChartConfig);
        }
      });*/

      container.appendChild(canvas);
      container.appendChild(deleteIcon);
      // container.appendChild(checkbox);
      this.buildArea.nativeElement.appendChild(container);

      const context = canvas.getContext('2d');
      // @ts-ignore
      new Chart(context, this.draggedChartConfig);

      this.draggedChartConfig = null; // Reset after drop
    }
  }

  ngAfterViewInit(): void {
    // Initialize preview charts
    this.charts.forEach((chartConfig) => {
      const canvas = document.getElementById(chartConfig.type + '-preview') as HTMLCanvasElement;
      if (canvas) {
        const context = canvas.getContext('2d');
        // @ts-ignore
        new Chart(context, chartConfig);
      }
    });
  }

  ngOnInit() {
    this.getSaleInvoice(this.heading)
    this.cookieService.set('accessToken',this.router.snapshot.params['_id'])

    this.service.GetTenantServiceStructure(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      this.serviceData = res.data
      console.log(res)
    })
  }

  //Dashboard
  getDashboard(heading:any){
    this.heading = heading
    this.data=[]
    this.realdata=[]
    this.forChange=false
  }

  //Sale Invoice
  getSaleInvoice(heading:any){
    this.heading = heading
    this.data=[{key:'New Field Text',type:'string',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
      calculation:'',arrayWithCalculation:'',showCalculation:false}]
    this.realdata=[]
    this.forChange=false
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
    }
  }

  postSaleInvoice(){
    if (this.cookieService.get('PUBLISH')==='invoice'){
      console.log(this.realdata)
      this.service.updateSaleInvoiceStructure(this.realdata,this.router.snapshot.params['_id']).subscribe((res:any)=>{
        console.log(res.error)

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
        this.status = res
        console.log(this.status)
        if (res.status === 'SUCCESS'){
          this.toast.success({detail:'Success',summary:res.status})
          // this.route.navigate([''])
          // this.cookieService.delete('PUBLISH')
        } else if (res.status === 'ERROR'){
          this.toast.error({detail:'Error',summary:res.error})
        }
      })
    }
  }

  //Sale Quatation
  getSaleQuatation(heading:any){
    this.heading = heading
    this.data=[{key:'New Field Text',type:'string',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
      calculation:'',arrayWithCalculation:'',showCalculation:false}]
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
    this.data=[{key:'New Field Text',type:'string',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
      calculation:'',arrayWithCalculation:'',showCalculation:false}]
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
    this.data=[{key:'New Field Text',type:'string',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
      calculation:'',arrayWithCalculation:'',showCalculation:false}]
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
    this.data=[{key:'New Field Text',type:'string',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
      calculation:'',arrayWithCalculation:'',showCalculation:false}]
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
    this.data=[{key:'New Field Text',type:'string',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
      calculation:'',arrayWithCalculation:'',showCalculation:false}]
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
        console.log(res)
        //
        if (res.status === 'SUCCESS') {
          this.toast.success({detail: 'Success', summary: res.error})
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
    this.data=[{key:'New Field Text',type:'string',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
      calculation:'',arrayWithCalculation:'',showCalculation:false}]
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
      // this.route.navigate([''])
      this.cookieService.delete('PUBLISH')
      console.log(res)
    })
  }

  blank(){
  this.data=[{key:'New Field Text',type:'string',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
    default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
    autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
    calculation:'',arrayWithCalculation:'',showCalculation:false}]
  this.realdata=[]
  this.forChange=false
  }

  postV(value:any,event:any,index:any) {
    console.log(value.value,event,index)
    if (event.checked){
      this.forChange = value
      console.log(new Date(value.default))
      this.realdata.push(value)
      // @ts-ignore
      document.getElementById(`build-area_${index}`).classList.add('active2')
      this.index = index
    } else {
      console.log(this.realdata)
      this.realdata.splice(index, 1)
      this.forChange=false
      this.length = this.realdata.length
      // @ts-ignore
      document.getElementById(`build-area_${index}`).classList.remove('active2')
      // @ts-ignore
      document.getElementById(`build-area_${index}`).classList.remove('done')
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
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
    calculation:'',arrayWithCalculation:'',showCalculation:false},

    {key:'New Field Number',type:'number',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:0,required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
    calculation:'',arrayWithCalculation:'',showCalculation:false},

    {key:'New Field Date',type:'date',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'2024-01-09',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
    calculation:'',arrayWithCalculation:'',showCalculation:false},

    {key:'New Field Email',type:'email',relation:'no',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:'xyz@gmail.com',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
    calculation:'',arrayWithCalculation:'',showCalculation:false},

    {key:'New Array',value:[

        {key:'New Array Field Text',type:'string',relation:'array',belong:'New Array',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          default:'text',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
        calculation:'',arrayWithCalculation:'',showCalculation:false},
        {key:'New Array Field Number',type:'number',relation:'array',belong:'New Array',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          default:0,required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
        calculation:'',arrayWithCalculation:'',showCalculation:false},
        {key:'New Array Field Date',type:'date',relation:'array',belong:'New Array',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          default:0,required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
        calculation:'',arrayWithCalculation:'',showCalculation:false},
        {key:'New Array Field Email',type:'email',relation:'array',belong:'New Array',isArray:false,primarykey:false,fkey:false,ckey:false,uppercase:false,
          default:'xyz@gmail.com',required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
          autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
        calculation:'',arrayWithCalculation:'',showCalculation:false}

      ],type:'array',relation:'array',belong:'New Array',isArray:true,primarykey:false,fkey:false,ckey:false,uppercase:false,
      default:"NA",required:true,enum:false,enumValues: ["BANK OF INDIA", "STATE BANK", "PUNJAB BANK", "ICICI BANK"],minlength:"1",maxlength:"100",boolean:true,
      autoIncrement:false,lowercase:false,trim:false,unique:false,min:0,max:0,sign:false,unsign:false,float:false,int:false,floor:false,celling:false,steps:0,indexes:false,hasFeilds:'new',dateToFormat:'',indexType:'',moduleName:'',subModuleName:'',primaryKey2:'',operation:'',
    calculation:'',arrayWithCalculation:'',showCalculation:false},

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
      this.addElementToForm(element,'i','na');
    }
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
    // event.stopPropagation();
  }

  ondropArray(event: DragEvent,i:any) {
    event.preventDefault();
    const elementData = event.dataTransfer?.getData('text/plain');
    if (elementData) {
      const element = JSON.parse(elementData);
      this.addElementToForm(element,i,'Array');
    }
  }

  allowDropArray(event: DragEvent) {
    event.preventDefault();
    // event.stopPropagation();
  }

  addElementToForm(element: any,i:any,type:any) {
      console.log(element)
    if (type==='Array'){
      this.data[i].value.push(element)
    } else if (type!='Array') {
      this.data.push(element)
      this.newarry = this.data
    }
  }

  Done(forChange: any) {
    console.log(forChange)
    this.service.validatCommon(forChange,this.router.snapshot.params['_id']).subscribe((res:any)=>{
      this.status = res
      console.log(this.status)
      if (res.status === 'SUCCESS'){
        this.toast.success({detail:'Success',summary:res.status})
        this.forChange=false
        // @ts-ignore
        document.getElementById('build-area').classList.remove('error')
        // @ts-ignore
        document.getElementById(`build-area_${this.index}`).classList.add('done')
        // this.route.navigate([''])
        // this.cookieService.delete('PUBLISH')
      } else if (res.status === 'ERROR'){
        this.toast.error({detail:'Error',summary:res.error})
      }
    })
    ValidateFields(forChange)
    // for (let forChangeKey in this.realdata) {
    //   this.length = forChangeKey
    // }
    this.length = this.realdata.length
    console.log(this.length)
  }

  moveToBin(forChange: any) {
    this.data.splice(this.index,1)
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




  addChart(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(event)
    // Add our fruit
    if (value) {
      this.selectedCharts.data.datasets.push({
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55, 40],
      label: value
      });
    }
    this.selectedCharts.update();
    // Clear the input value
    event.chipInput!.clear();
    this.fruitCtrl.setValue(null);
  }

  removeChart(fruit: string): void {
    const index = this.selectedCharts.data.datasets.indexOf(fruit);
    console.log(index)
    if (index >= 0) {
      this.selectedCharts.data.datasets.splice(index, 1);
    }
  }
}


