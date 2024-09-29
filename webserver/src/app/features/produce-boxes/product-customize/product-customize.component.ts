import {Component, OnInit} from '@angular/core';
import {BucketService} from "../../../shared/services/bucket.service";
import {MainAuth} from "../../../core/services/mainAuth";
import {LocationService} from "../../../shared/services/location.service";
import {Observable, shareReplay} from "rxjs";
import {catchError} from "rxjs/operators";
import {userNotification} from "../../../shared/services/userNotification.service";
import {ActivatedRoute, Router} from "@angular/router";
import { isEqual } from 'lodash';
@Component({
  selector: 'app-product-customize',
  templateUrl: './product-customize.component.html',
  styleUrls: ['./product-customize.component.scss']
})
export class ProductCustomizeComponent implements OnInit{

  card: any;
  cardsData:{}[] ;
  bucketSizes: string[] = [];
  frequency : string ='Choose a Frequency';
  productNumber:number = 0;
  selectedSize: string = 'Choose a Bucket Size';
  deliveryDate:string[] =[];
  selectedDate:string = 'Choose a delivery date';
  bucketContent$!:Observable<any>
  toggleBoxContent: boolean = false;
  isLoggedIn:boolean = false
  dateAvailable:boolean = false;
  produceList:any=[]

  constructor(private bucketSizeService :BucketService,
              private locationService : LocationService,
              private notificationService : userNotification,
              private router : Router,
              private mainAuth : MainAuth,
              private route : ActivatedRoute)
  {
    this.cardsData = [{
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
  }


  ngOnInit() {
    this.route.params.subscribe( params => {  //getting productNumber from param
      this.productNumber = params['product'];
    })

    this.card = history.state.cardDetails || this.cardsData[this.productNumber -1];  // query doesn't show
    console.log('this.card', this.card);
    this.fetchBucketSizes();
    this.openCompare();
    this.isLoggedIn = this.mainAuth.isLoggedIn();

    this.dateAvailable = !!sessionStorage.getItem('u_pc');

    const deliveryDatesString = this.locationService.getDeliveryDates();

    try {
      this.deliveryDate = JSON.parse(deliveryDatesString);
    } catch (error) {
      this.deliveryDate = deliveryDatesString;
    }

    console.log('dd',this.deliveryDate)
    if(this.deliveryDate===null){

    }
    this.selectedSize = sessionStorage.getItem('bucketSize') || 'Choose a Bucket Size';
    this.frequency = sessionStorage.getItem('frequency') || 'Choose a Frequency';
    this.fetchProduceList()
  }

  fetchBucketSizes(){
    this.bucketSizeService.getBucketSizes(this.card.header).subscribe((sizes: any) => {
      this.bucketSizes = sizes.data;
    });
  }

  onChangeSize(event: any) {
    this.selectedSize = event.target.value;
    sessionStorage.setItem('bucketSize', this.selectedSize);
    this.fetchProduceList()
  }

  fetchProduceList(){
    this.bucketContent$.subscribe((res:any)=>{
      res.data.map((data: any)=>{
        if (data.boxSize===this.selectedSize){
          this.produceList = data
        }
      })
    })
  }

  onChangeFrequency(event: any) {
    this.frequency = event.target.value;
    sessionStorage.setItem('frequency', this.frequency );
  }

  onChangeDate(event: any){
    this.selectedDate = event.target.value;
  }

  openCompare(){
    this.bucketContent$ = this.bucketSizeService.getBucketContent(this.card.header).pipe((catchError((error:any)=>{
        console.log('error fetching bucket content:',error)
        this.notificationService.showError(error.error.message)
        return []
      })),
      shareReplay(1)
    )
  }

  createBox(image:any){
    if (this.frequency === 'Choose a Frequency' || this.selectedSize === 'Choose a Bucket Size' || this.selectedDate === 'Choose a delivery date') {
      // Validation error: Not all fields are selected
      this.notificationService.showError('Please select all fields to create a box.');
      return;
    }
    console.log('selected size',this.selectedSize)
    const parts = this.selectedSize.split('-');
    const size = parts[0];
    const price = parts[1];
    const CartContents = {
      boxImg:image,
      boxType: this.card.header,
      boxSize: size,
      frequency: this.frequency,
      price: this.produceList.price,
      currency: 'INR' ,
      deliveryDate: this.selectedDate,
      weight: this.produceList.weight,
      unit: this.produceList.unit,
    };
    console.log('is login',this.isLoggedIn)
    if(!this.isLoggedIn){
      let sessionData = JSON.parse(sessionStorage.getItem('CartContents') || '[]');
      // Check if newData already exists in sessionData
      const index = sessionData.findIndex((item: any) => isEqual(item, CartContents));
      if (index !== -1) {
        // If newData already exists, update it
        sessionData[index] = CartContents;
      } else {
        // If newData doesn't exist, add it to the array
        sessionData.push(CartContents);
      }
      sessionStorage.setItem('CartContents', JSON.stringify(sessionData));
      this.notificationService.showSuccess('Box Created Successfully');
      this.router.navigate(['/product/checkout'],{state:{cartImage:image}});
    }else{
      this.bucketSizeService.setCart({items:CartContents,produceList:this.produceList.produceList}).subscribe((res:any)=>{
        this.notificationService.showSuccess('Box Created Successfully');
        this.router.navigate(['/product/checkout'],{state:{cartImage:image}});
      },(error:any)=>{
        console.log('error',error);
        this.notificationService.showError(error.error);
      })
    }
  }
}
