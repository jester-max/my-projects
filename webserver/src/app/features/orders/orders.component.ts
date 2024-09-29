import { Component,OnInit } from '@angular/core';
import {OrderService} from "../../shared/services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderDetails:any
  cardsData:any=[]
  constructor(
    private orderService : OrderService,
    public router: Router
  ){
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

  ngOnInit():void{
    this.orderService.OrderGet().subscribe((response: any)=>{
      this.orderDetails = response.data;
      this.orderDetails.forEach((dataItem:  any) => {
        dataItem.CartContents.forEach((cartItem:  any) => {
          // Find matching image from imageArray
          let matchingImage = this.cardsData.find((image: any) => image.header === cartItem.boxType);
          cartItem['boxImg'] = matchingImage.image
        })
      })
      console.log(this.orderDetails)
    })
  }
}
