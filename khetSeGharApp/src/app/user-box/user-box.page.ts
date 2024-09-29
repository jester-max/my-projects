import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ServicesService} from "../services.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.page.html',
  styleUrls: ['./user-box.page.scss'],
})
export class UserBoxPage implements OnInit {
  userBox: any[] = [];

  constructor(public navCtrl: NavController, private service: ServicesService, private activeRoute: ActivatedRoute,private router: Router) {
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

  ngOnInit(): void {
      this.service.getUserBox(this.activeRoute.snapshot.params['id']).subscribe((res:any)=>{
        this.userBox = res.data;
        this.userBox.forEach((dataItem:  any) => {
            // Find matching image from imageArray
            let matchingImage = this.cardsData.find((image: any) => image.header === dataItem.boxType);
          dataItem['boxImg'] = matchingImage.image
        })
        console.log(this.userBox);
      })
  }


  showItems(boxId: string): void {
    this.router.navigate(['/user-box-items', boxId]);


  }

}
