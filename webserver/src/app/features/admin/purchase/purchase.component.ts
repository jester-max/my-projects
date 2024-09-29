import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {IResponse} from "../../../shared/interfaces/response.interface";
import {IAdminUser} from "../../../shared/interfaces/admin-user.interface";
import {AdminDashboardService} from "../dashboard/admin-dashboard-service";
import {userNotification} from "../../../shared/services/userNotification.service";
import {initFlowbite, initModals, initPopovers, initTabs, initTooltips} from "flowbite";

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit{
  adminDetails?: Observable<IResponse<IAdminUser[]>>;

  marketPurchase: FormGroup;
  farmersProducts:any

  itemsList:any=[]
  itemName:any=''
  searchData:any=[]
  isOpen:any=false

  constructor(
    public adminDashboardService: AdminDashboardService,
    private fb: FormBuilder,
    private userNotificationService: userNotification,
    private ngZone: NgZone ) {
    this.marketPurchase = this.fb.group({
      farmerName: ['', [Validators.required]],
      productName: ['Apple', [Validators.required]],
      category: ['Fruit', [Validators.required]],
      rate: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unit: ['kg', [Validators.required]],
      source: ['market', [Validators.required]],
    });
  }

  ngOnInit() {
      initFlowbite();
      initModals();
      initPopovers();
      initTabs();
      initTooltips();

    // this.adminDetails = this.adminDashboardService.adminDetails$();
    this.getProduct();
    this.setItems();
  }

  getProduct(){
    this.adminDashboardService.getPurchase().subscribe((res:any)=>{
        this.farmersProducts = res.data||[]
    },(err:any)=>{
      this.userNotificationService.showError(err.error.message);
    })
  }

  addProduct(){
    console.log(this.marketPurchase.value)
    this.adminDashboardService.addMarketPurchase(this.marketPurchase.value).subscribe((res:any)=>{
      this.userNotificationService.showSuccess('Product added successfully!');
      this.getProduct();
    },(err:any)=>{
      console.log(err)
      this.userNotificationService.showError(err.error.message);
    })
  }

  distributeItem(productId:any){
    this.adminDashboardService.postDistributeItem(productId).subscribe((res:any)=>{
      this.userNotificationService.showSuccess(res.message);
      this.getProduct();
    },(err:any)=>{
      console.log(err)
      this.userNotificationService.showError(err.error.message);
    })
  }

  setItems(){
    this.itemsList=[]
    if (this.marketPurchase.get('category')?.value==='Vegetable'){
      this.marketPurchase.controls['productName'].setValue('Potato')
      this.itemsList.push(
        'Potato',
        "Tomato",
        'Carrot',
        'Onion',
        'Green Chillies',
        'Couriander leaf',
        'Garlic',
        'Cauliflower',
        'Beetroot',
        'Radish'
      )
    } else {
      this.marketPurchase.controls['productName'].setValue('Apple')
      this.itemsList.push(
        'Apple',
        "Mango",
        'Pineapple',
        'Watermelon',
        'Cucumber',
        'Cauliflower',
        'Papaya'
      )
    }
    this.searchItems();
  }

  searchItems(){
    this.searchData = this.itemsList.filter((obj:any) => obj.toLocaleLowerCase().includes(this.itemName.toLocaleLowerCase()));
  }
}
