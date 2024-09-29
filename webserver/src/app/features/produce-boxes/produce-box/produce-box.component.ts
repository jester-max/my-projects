import {Component, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {Router} from "@angular/router";

@Component({
  selector: 'app-produce-box',
  templateUrl: './produce-box.component.html',
  styleUrls: ['./produce-box.component.scss']
})
export class ProduceBoxComponent implements OnInit{

  ngOnInit() {
    console.log('hi from produce')
    initFlowbite();
  }
  constructor(private router:Router) {
  }

  cardsData = [
    {
      image: "https://images.pexels.com/photos/219794/pexels-photo-219794.jpeg?auto=compress&cs=tinysrgb&w=800",
      header: "Mix Fruit and Vegetables",
      description: "Get Combination of HandPicked Fruits and vegetables.Good choice for people who don't cook often. ",
      link: "#"
    },
    {
      image: "https://images.pexels.com/photos/6707512/pexels-photo-6707512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
      image: "https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      header: "Veggie Only",
      description: "This organic vegetable mix, recommended for the committed fellow for green vegetables, adds healthy nutrients to your diet. ",
      link: "#"
    }
  ];

  grabBox(card:any,productNumber:number) {
    this.router.navigate(['product/customize',productNumber], { state:{cardDetails: card }});
  }
}
