import {Component, NgZone, OnInit} from '@angular/core';
import {interval, Observable, switchMap} from "rxjs";
import {IResponse} from "../../../shared/interfaces/response.interface";
import {IAdminUser} from "../../../shared/interfaces/admin-user.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminDashboardService} from "../dashboard/admin-dashboard-service";
import {userNotification} from "../../../shared/services/userNotification.service";
import {initFlowbite, initModals, initPopovers, initTabs, initTooltips} from "flowbite";

@Component({
  selector: 'app-purchase-request',
  templateUrl: './purchase-request.component.html',
  styleUrls: ['./purchase-request.component.scss']
})
export class PurchaseRequestComponent implements OnInit{

  marketPurchase: FormGroup;
  farmersProducts:any
  requestId:any

  constructor(
    public adminDashboardService: AdminDashboardService,
    private fb: FormBuilder,
    private userNotificationService: userNotification,
    private ngZone: NgZone ) {
    this.marketPurchase = this.fb.group({
      farmerName: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      category: ['Fruit', [Validators.required]],
      rate: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unit: ['kg', [Validators.required]],
      source: ['market', [Validators.required]],
    });
  }

  ngOnInit() {

    // this.adminDetails = this.adminDashboardService.adminDetails$();

    this.adminDashboardService.getRequestingProduct().subscribe((res:any)=>{
        this.farmersProducts = res.data
        console.log(this.farmersProducts)
        this.userNotificationService.showSuccess('Purchased requested are getting successfully!');
    },error => {
      this.userNotificationService.showError(error.error.message);
    })
  }

  addProduct(){
    this.adminDashboardService.addMarketPurchase(this.marketPurchase.value).subscribe((res:any)=>{
      this.userNotificationService.showSuccess('Product added successfully!');
      location.reload();
    },(err:any)=>{
      console.log(err)
      this.userNotificationService.showError(err.error.message);
    })
  }

  buyRequest(requestId:any){
    this.adminDashboardService.postBuyRequest({paymentMethod:'COD',requestId:requestId}).subscribe((res:any)=>{
      this.userNotificationService.showSuccess(res.message);
      console.log(res)
    },(err:any)=>{
      console.log(err)
      this.userNotificationService.showError(err.error.message);
    })
  }
}
