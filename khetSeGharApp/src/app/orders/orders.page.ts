import { Component, OnInit } from '@angular/core';
import {ServicesService} from "../services.service";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  oders: any
  productDetails: any
  orderId: any

  constructor(private nav: NavController, private service: ServicesService, public activeRoute: ActivatedRoute, public navCtrl: NavController) {
  }

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







  orderDetail(index: number) {
    this.orderId = this.oders[index]._id;
    console.log('dfghj', this.orderId);
    this.nav.navigateForward(`order-details/${this.orderId}`, {animated: true, animationDirection: "forward"})

  }

  oderData() {
    this.service.getOder().subscribe((res: any) => {
      console.log('getAddress API Response:', res);
      if (res && res.data) {
        this.oders = res.data;
        this.oders.forEach((dataItem:  any) => {
          dataItem.CartContents.forEach((item:  any) => {
            // Find matching image from imageArray
            let matchingImage = this.cardsData.find((image: any) => image.header === item.boxType);
            item['boxImg'] = matchingImage.image
          })
        })
        console.log('User Data:', this.oders);
      }
    }, (error) => {
      console.error('Error fetching user address data:', error);
    });
  }


  ngOnInit() {

    this.oderData();
  }
}
