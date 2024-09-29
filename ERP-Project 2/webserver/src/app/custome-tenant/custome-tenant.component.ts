import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../service.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'
import { someFunction } from './custome';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-custome-tenant',
  templateUrl: './custome-tenant.component.html',
  styleUrls: ['./custome-tenant.component.css']
})
export class CustomeTenantComponent {
  toppings = this._formBuilder.group({
    invoice: false,
    extracheese: false,
    mushroom: false,
  });

  realdata:any = []
  checkboxValue:any

  data:any
  typesOfShoes: string[] = ['tenantID','invNum','invDate','buyerOrder','paymentTerms','proDetails','proName','proHsnCode','proQuantity',
  'proRate','proAmount','proMeasurement','productDiscountInPer','productDiscountInAmount','productDiscountAmount','CGST','SGST','IGST','CGSTValue','IGSTValue','SGSTValue',
  'textableValue','textableWord','invoiceValue','invoiceWord','paymentStatus','custDetails',];
  constructor(private _formBuilder: FormBuilder,private router:ActivatedRoute,private service:ServiceService,private route:Router,private http:HttpClient) {}
  panelOpenState = false;
  selectedOptions: string[] = [];

  myControl = new FormControl('');
  options: string[] = ['date', 'text', 'number'];
  filteredOptions: any;
  changeValue:any
  returnValue:any
  forChange:any

  newArray:any[]=[]
  allComplete: boolean = false;

  newFeilds:any = false

  newObject:any

  obj={key:'Field Name',value:'',type:'string',relation:'no',isArray:false}

  ngOnInit():void{
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value || '')),
    // );

    this.service.getInvoice().subscribe((res:any)=>{
     this.returnValue = someFunction(res.data)
      this.data = this.returnValue
      console.log(this.data,'main data')

      // for (let key in this.data) {
      //   if (this.data.hasOwnProperty(key)) {
      //     console.log(key + ':', this.data[key]);
      //   }
      // }
    })
  }

  onSelectionChange(shoes:any) {
    this.selectedOptions = shoes.selectedOptions.selected.map((option: { value: any; }) => option.value);
    this.panelOpenState = this.selectedOptions.length > 0;
  }

  click(){
    if(this.toppings.value.invoice){
      this.service.getInvoice().subscribe((res:any)=>{
        this.data = res.data
        console.log(res)
        for (let key in this.data) {
          if (this.data.hasOwnProperty(key)) {
            console.log(key + ':', this.data[key]);
          }
        }
      })
    }
  }

  changeInput(value:any){
    console.log(value)
    this.changeValue = value
  }

  chackeBox(value:any){
    console.log(value)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  postV(value:any,event:any) {
    if (event.checked){
      this.forChange = value
      this.realdata.push(value)
      // this.realdata.add(value)
       console.log(this.realdata)
    } else {
      this.realdata.pop(value)
      console.log(this.realdata,"not allowed")
    }
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


  submit(data:any){
    console.log(this.realdata)
    this.service.postSaleInvoiceStructure(this.realdata,this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res)
      if (res.Status === "SUCCESS") {
        this.route.navigate(['invoice/', this.router.snapshot.params['_id']])
      }
    })
// Here you can handle adding the element to your form structure or do further actions
    // const buildArea = document.getElementById('build-area');
    // if (buildArea) {
    //   const newElement = document.createElement('div');
    //   console.log(newElement)
    //   newElement.classList.add('form-group');
    //   newElement.innerHTML = `<label>${element.label}</label>`;
    //   if (element.type === 'text') {
    //     newElement.innerHTML += `<input type="text" class="form-control">`;
    //   } else if (element.type === 'textarea') {
    //     newElement.innerHTML += `<textarea class="form-control"></textarea>`;
    //   }
    //   buildArea.appendChild(newElement);
    // }
  }

  addNewFeilds(){
    this.forChange=this.obj
    this.data.push(this.obj)
  }

  addNewArray(){

    this.data.push(this.data.proDetails)
  }



  addproduct(i:number){
    console.log(this.data)
    var iter = this.data[i].value
    console.log(iter)
    this.data.push({
      key:'New One',
      value:iter,
      relation:'array',
      type:'array',
      belong:'New One'
    });
  }
  removeproduct(i: number) {
    this.data.proDetails.splice(i, 1);
  }

}
