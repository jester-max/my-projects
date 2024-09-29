import {Component, NgZone, OnInit} from '@angular/core';
import {interval, Observable, switchMap} from "rxjs";
import {IResponse} from "../../../shared/interfaces/response.interface";
import {IAdminUser} from "../../../shared/interfaces/admin-user.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminDashboardService} from "../dashboard/admin-dashboard-service";
import {userNotification} from "../../../shared/services/userNotification.service";
import {initFlowbite, initModals, initPopovers, initTabs, initTooltips} from "flowbite";

@Component({
  selector: 'app-users-boxes',
  templateUrl: './users-boxes.component.html',
  styleUrls: ['./users-boxes.component.scss']
})
export class UsersBoxesComponent implements OnInit{
  marketPurchase: FormGroup;
  farmersProducts:any
  boxesDetails:any

  cardsData = [{
    image: "assets/images/mix-fruit.jpeg",
    header: "Mix Fruit and Vegetables",
    description: "Get Combination of HandPicked Fruits and vegetables.Good choice for people who don't cook often. ",
    link: "#"
  },
    {
      image: "assets/images/no-cooking.png",
      header: "No Cooking",
      description: "This box is ideal for people who're on the rush, as it contains largely fruit and just quick, easy-to-prepare veggies.",
      link: "#"
    },
    {
      image: "assets/images/fruit-only.webp",
      header: "Fruit Only",
      description: "All fruit! This box includes a lovely mix of luscious, ripe organic fruit. It is ideal for folks who adore fruit for snacking, baking, or juicing.",
      link: "#"
    },
    {
      image: "assets/images/seasonal-fruits.png",
      header: "Seasonal Only",
      description: "This mix contains exclusively produce which contains seasonal fruit and vegetable. ",
      link: "#"
    },
    {
      image: "assets/images/veggie-only.jpeg",
      header: "Veggie Only",
      description: "This organic vegetable mix, recommended for the committed fellow for green vegetables, adds healthy nutrients to your diet. ",
      link: "#"
    },
    {
      image: "assets/images/snack-pack.webp",
      header: "Snack Pack",
      description: "Each box contains easy-to-eat, fresh fruit to keep you and your loved ones team energised and productive.",
      link: "#"
    }];

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
      initFlowbite();
      initModals();
      initPopovers();
      initTabs();
      initTooltips();

    this.adminDashboardService.getUserBoxes().subscribe((res:any)=>{
      console.log(res)
      this.boxesDetails=res.data
      this.boxesDetails.forEach((dataItem:  any) => {
        // Find matching image from imageArray
        let matchingImage = this.cardsData.find((image: any) => image.header === dataItem.boxType) || this.boxesDetails;
        dataItem['boxImg'] = matchingImage.image
      })
      this.userNotificationService.showSuccess('Boxes are getting successfully!');
    },(err:any)=>{
      this.userNotificationService.showError(err.error.message);
    })

    // const data = interval(10000)
    //   .pipe(switchMap(() => this.adminDashboardService.getUserBoxes()))
    //
    // data.subscribe((value: any) => {
    //   this.boxesDetails = value.data
    //   this.boxesDetails.forEach((dataItem:  any) => {
    //     // Find matching image from imageArray
    //     let matchingImage = this.cardsData.find((image: any) => image.header === dataItem.boxType) || this.boxesDetails;
    //     dataItem['boxImg'] = matchingImage.image
    //   })
    //   console.log(this.boxesDetails)
    // })

    // this.adminDetails = this.adminDashboardService.adminDetails$();

    this.adminDashboardService.getPurchase().subscribe((res:any)=>{
      if (res.status === 'Success'){
        this.farmersProducts = res.data
        console.log(this.farmersProducts)
        this.userNotificationService.showSuccess('Purchased are getting successfully!');
      }else {
        this.userNotificationService.showError(res.status);
        console.log(res)
      }
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
}
