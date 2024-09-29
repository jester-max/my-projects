import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ServicesService} from "../services.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  cardsData:any = [
    {
      image: "assets/mix-Photoroom.png",
      header: "Mix Fruit and Vegetables",
      description: "Get Combination of HandPicked Fruits and vegetables.Good choice for people who don't cook often. ",
      link: "#"
    },
    {
      image: "assets/vegitabels-Photoroom.png",
      header: "Veggie Only",
      description: "This organic vegetable mix, recommended for the committed fellow for green vegetables, adds healthy nutrients to your diet.",
      link: "#"
    },
    {
      image: "assets/fruits-Photoroom.png",
      header: "Fruit Only",
      description: "All fruit! This box includes a lovely mix of luscious, ripe organic fruit. It is ideal for folks who adore fruit for snacking, baking, or juicing.",
      link: "#"
    },
    {
      image: "assets/seasonal-Photoroom.png",
      header: "Seasonal Only",
      description: "This mix contains exclusively produce which contains seasonal fruit and vegetable. ",
      link: "#"
    },
  ];

  productDetails:any;
  boxSizeDetails:any
  deliveryDates:any
  frequency:any
  deliveryDate:any
  size:any
  produceList:any

  constructor( private HTTP:HttpClient, public activeRoute: ActivatedRoute, private service:ServicesService,public navCtrl:NavController, private http:HttpClient,private router:Router)  {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((queryId:any)=>{
      this.productDetails = this.cardsData[queryId.id]
       console.log(this.productDetails)
    });
    this.service.getBucketContent(this.productDetails?.header).subscribe((res:any)=>{
      this.boxSizeDetails = res.data
      console.log(this.boxSizeDetails)
    })
    this.service.findZone(localStorage.getItem('zipCode')||'').subscribe((res:any)=>{
      console.log(res)
      this.deliveryDates = res.deliveryDates
    })
  }

  fetchProduceList() {
    this.produceList = this.boxSizeDetails.find((data: any) => data.boxSize === this.size);
    if (!this.produceList) {
      console.error('No produce list found for size:', this.size);
    } else {
      console.log('Selected produce list:', this.produceList);
    }
  }


  createBox() {
    if (!this.produceList) {
      return;
    }
    const CartContent = {
      boxType: this.productDetails?.header,
      boxSize: this.size,
      frequency: this.frequency,
      price: this.produceList.price,
      currency: 'INR',
      deliveryDate: this.deliveryDate,
      weight: this.produceList.weight,
      unit: this.produceList.unit
    };

    this.service.postBox({items: CartContent, produceList: this.produceList.produceList}).subscribe(
      (res: any) => {
        console.log(res)
        this.service.toastSuccess('Card create successfully');
        this.router.navigate(['/select-box-size']);
      }
    );
  }





}
