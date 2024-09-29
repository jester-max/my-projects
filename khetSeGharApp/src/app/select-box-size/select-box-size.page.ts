import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {ServicesService} from "../services.service";

@Component({
  selector: 'app-select-box-size',
  templateUrl: './select-box-size.page.html',
  styleUrls: ['./select-box-size.page.scss'],
})
export class SelectBoxSizePage implements OnInit {
  cardDetails:any
  userData:any
  paymentMethod: string = '';

  constructor( public navCtrl:NavController,public activeRoute: ActivatedRoute,private service:ServicesService) { }


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




  ngOnInit() {
    this.activeRoute.queryParams.subscribe((queryId:any)=>{
      console.log(queryId.paymentMethod)
      this.paymentMethod = queryId.paymentMethod || '';
    });
    this.userAddressData();
    this.activeRoute.queryParams.subscribe((queryId:any)=>{
      this.service.getBox().subscribe((res:any)=>{
        this.cardDetails = res.data
        console.log(this.cardDetails)
        this.cardDetails.CartContents.forEach((dataItem:  any) => {
          // Find matching image from imageArray
          let matchingImage = this.cardsData.find((image: any) => image.header === dataItem.boxType);
          dataItem['boxImg'] = matchingImage.image
        })
        console.log(this.cardDetails)
      })
    });
  }

  ionViewWillEnter(){
    this.userAddressData();
  }

  userAddressData() {
    this.service.getAddress().subscribe((res: any) => {
      console.log('getAddress API Response:', res);
      if (res && res.data) {
        this.userData = res.data;
        console.log('User Data:', this.userData);
      }
    }, (error) => {
      console.error('Error fetching user address data:', error);
    });
  }

  removeItem(id:any){
    this.service.removeBox(id).subscribe((res:any)=>{
      console.log(res)
      this.service.toastSuccess('Item removed from cart successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  }

  placeOrder(){
    const orderDetails ={
      "shippingAddress":{
        streetAddress:this.userData.address[0].streetAddress,
        city:this.userData.address[0].city,
        state:this.userData.address[0].state,
        zipCode:this.userData.address[0].zipCode,
    },
      "billingAddress":{
        streetAddress:this.userData.address[0].streetAddress,
        city:this.userData.address[0].city,
        state:this.userData.address[0].state,
        zipCode:this.userData.address[0].zipCode,
      },
      "paymentMethod":this.paymentMethod
    }
    console.log(orderDetails);

    this.service.postOder(orderDetails).subscribe((res:any)=>{
      console.log(res)
    })

  }

}
