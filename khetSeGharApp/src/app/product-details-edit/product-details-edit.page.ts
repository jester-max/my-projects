import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ServicesService} from "../services.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-details-edit',
  templateUrl: './product-details-edit.page.html',
  styleUrls: ['./product-details-edit.page.scss'],
})
export class ProductDetailsEditPage implements OnInit {

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

  constructor(public navCtrl: NavController, private service: ServicesService,
              private formBuilder: FormBuilder, public activeRoute: ActivatedRoute,private router:Router) {
  }

  ngOnInit() {
    this.service.getCardItem(this.activeRoute.snapshot.params['id']).subscribe((res:any)=>{
      this.productDetails = res.data
      this.size = res.data.boxSize
      this.frequency = res.data.frequency
      this.deliveryDate = res.data.deliveryDate

        // Find matching image from imageArray
      this.productDetails['cardsData'] = this.cardsData.find((image: any) => image.header === res.data.boxType);

      console.log(this.productDetails);
      this.service.toastSuccess('Item edit from cart successfully');
      this.service.getBucketContent(this.productDetails?.boxType).subscribe((res:any)=>{
        this.boxSizeDetails = res.data
        console.log(this.boxSizeDetails)
      })
    },error => {
      this.service.toastSuccess(error.error.message);
    });
    console.log(this.productDetails);

    this.service.findZone(localStorage.getItem('zipCode')||'').subscribe((res:any)=>{
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
