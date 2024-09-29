import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {IResponse} from "../../../shared/interfaces/response.interface";
import {IAdminUser} from "../../../shared/interfaces/admin-user.interface";
import {AdminDashboardService} from "../dashboard/admin-dashboard-service";
import {userNotification} from "../../../shared/services/userNotification.service";
import {initFlowbite, initModals, initPopovers, initTabs, initTooltips} from "flowbite";
import {ActivatedRoute, Router} from "@angular/router";

import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModuleRegistry,
  createGrid,
} from "ag-grid-community";

@Component({
  selector: 'app-farmer-products',
  templateUrl: './farmer-products.component.html',
  styleUrls: ['./farmer-products.component.scss']
})
export class FarmerProductsComponent implements AfterViewInit{
  adminUpdate: FormGroup;
  contactInformation: FormGroup;
  isOpenModal:any=false
  farmerDetail: any={
    farmerName:"",
    productId:"",
    productName:"",
    category:"",
    quantity:0,
    unit:"",
    unitPrice:0,
  };
  adminDetails?: Observable<IResponse<IAdminUser[]>>;

  farmersProducts:any

  constructor(
    public adminDashboardService: AdminDashboardService,
    private fb: FormBuilder,
    private userNotificationService: userNotification,
    private ngZone: NgZone,
    private router: Router) {
    this.adminUpdate = this.fb.group({
      firstName: ['', [Validators.minLength(3)]],
      lastName: ['', [Validators.minLength(3)]],
      city: ['', [Validators.minLength(3)]],
      zipCode: ['', [Validators.min(6)]],
      village: ['', [Validators.minLength(3)]],
      state: ['', [Validators.minLength(3)]],
      region: ['', [Validators.minLength(3)]],
      streetAddress: ['', [Validators.minLength(3)]],
      district: ['', [Validators.minLength(3)]],
      contact: ['', [Validators.min(10)]],
    });

    this.contactInformation = this.fb.group({
      fullName: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      streetAddress: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
  }

  ngAfterViewInit(): void{
    initFlowbite();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
  }

  ngOnInit() {
    // this.adminDetails = this.adminDashboardService.adminDetails$();

    this.adminDashboardService.getProduct().subscribe((res:any)=>{
        this.farmersProducts = res.data
        this.userNotificationService.showSuccess('Products are getting successfully!');
        this.ngAfterViewInit();
    },error => {
      this.userNotificationService.showError(error.error.message);
      console.log(error)
    })
  }

  requesting(requestDetails:any){
    console.log(requestDetails);
    this.farmerDetail={
      farmerName:requestDetails.user.firstName+''+requestDetails.user.lastName,
      productId:requestDetails.productId,
      productName:requestDetails.productDetails.productName,
      category:requestDetails.productDetails.category,
      quantity:requestDetails.productDetails.quantity,
      unit:requestDetails.productDetails.unit,
      unitPrice:requestDetails.productDetails.rate,
    };
    this.isOpenModal = !this.isOpenModal
  }

  postRequesting(){
    this.farmerDetail={
      ...this.farmerDetail,
      ['contactInformation']:this.contactInformation.value
    }
    this.adminDashboardService.postRequestingProduct(this.farmerDetail).subscribe((res:any)=>{
      this.userNotificationService.showSuccess('Product request created successfully!');
      location.reload();
    },(err:any)=>{
      console.log(err)
      this.userNotificationService.showError(err.error.message);
    })
  }


  public rowData: any[] | null = [
    {
      make: "Tesla",
      model: "Model Y",
      price: 64950,
      electric: true,
      month: "June",
    },
    {
      make: "Ford",
      model: "F-Series",
      price: 33850,
      electric: false,
      month: "October",
    },
    {
      make: "Toyota",
      model: "Corolla",
      price: 29600,
      electric: false,
      month: "August",
    },
    {
      make: "Mercedes",
      model: "EQA",
      price: 48890,
      electric: true,
      month: "February",
    },
    {
      make: "Fiat",
      model: "500",
      price: 15774,
      electric: false,
      month: "January",
    },
    {
      make: "Nissan",
      model: "Juke",
      price: 20675,
      electric: false,
      month: "March",
    },
    {
      make: "Vauxhall",
      model: "Corsa",
      price: 18460,
      electric: false,
      month: "July",
    },
    {
      make: "Volvo",
      model: "EX30",
      price: 33795,
      electric: true,
      month: "September",
    },
    {
      make: "Mercedes",
      model: "Maybach",
      price: 175720,
      electric: false,
      month: "December",
    },
    {
      make: "Vauxhall",
      model: "Astra",
      price: 25795,
      electric: false,
      month: "April",
    },
    {
      make: "Fiat",
      model: "Panda",
      price: 13724,
      electric: false,
      month: "November",
    },
    {
      make: "Jaguar",
      model: "I-PACE",
      price: 69425,
      electric: true,
      month: "May",
    },
    {
      make: "Tesla",
      model: "Model Y",
      price: 64950,
      electric: true,
      month: "June",
    },
    {
      make: "Ford",
      model: "F-Series",
      price: 33850,
      electric: false,
      month: "October",
    },
    {
      make: "Toyota",
      model: "Corolla",
      price: 29600,
      electric: false,
      month: "August",
    },
    {
      make: "Mercedes",
      model: "EQA",
      price: 48890,
      electric: true,
      month: "February",
    },
    {
      make: "Fiat",
      model: "500",
      price: 15774,
      electric: false,
      month: "January",
    },
    {
      make: "Nissan",
      model: "Juke",
      price: 20675,
      electric: false,
      month: "March",
    },
    {
      make: "Vauxhall",
      model: "Corsa",
      price: 18460,
      electric: false,
      month: "July",
    },
    {
      make: "Volvo",
      model: "EX30",
      price: 33795,
      electric: true,
      month: "September",
    },
    {
      make: "Mercedes",
      model: "Maybach",
      price: 175720,
      electric: false,
      month: "December",
    },
    {
      make: "Vauxhall",
      model: "Astra",
      price: 25795,
      electric: false,
      month: "April",
    },
    {
      make: "Fiat",
      model: "Panda",
      price: 13724,
      electric: false,
      month: "November",
    },
    {
      make: "Jaguar",
      model: "I-PACE",
      price: 69425,
      electric: true,
      month: "May",
    },
    {
      make: "Tesla",
      model: "Model Y",
      price: 64950,
      electric: true,
      month: "June",
    },
    {
      make: "Ford",
      model: "F-Series",
      price: 33850,
      electric: false,
      month: "October",
    },
    {
      make: "Toyota",
      model: "Corolla",
      price: 29600,
      electric: false,
      month: "August",
    },
    {
      make: "Mercedes",
      model: "EQA",
      price: 48890,
      electric: true,
      month: "February",
    },
    {
      make: "Fiat",
      model: "500",
      price: 15774,
      electric: false,
      month: "January",
    },
    {
      make: "Nissan",
      model: "Juke",
      price: 20675,
      electric: false,
      month: "March",
    },
    {
      make: "Vauxhall",
      model: "Corsa",
      price: 18460,
      electric: false,
      month: "July",
    },
    {
      make: "Volvo",
      model: "EX30",
      price: 33795,
      electric: true,
      month: "September",
    },
    {
      make: "Mercedes",
      model: "Maybach",
      price: 175720,
      electric: false,
      month: "December",
    },
    {
      make: "Vauxhall",
      model: "Astra",
      price: 25795,
      electric: false,
      month: "April",
    },
    {
      make: "Fiat",
      model: "Panda",
      price: 13724,
      electric: false,
      month: "November",
    },
    {
      make: "Jaguar",
      model: "I-PACE",
      price: 69425,
      electric: true,
      month: "May",
    },
  ];
  public columnDefs: ColDef[] = [
    {field: "user.firstName", checkboxSelection: true},
    {field: "user.email"},
    {field: "user.contact", filter: "agNumberColumnFilter"},
    {field: "address",
      valueGetter:function(params){
        return params.data.user.address.zipCode+","+params.data.user.address.Village
          +","+params.data.user.address.Block+","+params.data.user.address.District
          +","+params.data.user.address.State}
    },
    {field: "productDetails.productName"},
    {field: "quantity",
      valueGetter:function(params){
      return params.data.productDetails.quantity+" "+params.data.productDetails.unit}
    },
    {field: "productDetails.rate",
      valueGetter:function(params){
        return params.data.productDetails.rate+"/"+params.data.productDetails.unit}},
    {field: "price",
      valueGetter:function(params){
        return params.data.productDetails.quantity*params.data.productDetails.rate}
    },
  ];
  public defaultColDef: ColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
    flex:1,
    minWidth:100
  };
  public rowSelection: "single" | "multiple" = "multiple";
  public paginationPageSize = 10;
  public paginationPageSizeSelector: number[] | boolean = [10, 25, 50];
  public themeClass: string =
    "ag-theme-quartz";

}
