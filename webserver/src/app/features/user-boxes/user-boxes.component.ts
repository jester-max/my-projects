import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../shared/services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {userNotification} from "../../shared/services/userNotification.service";

@Component({
  selector: 'app-user-boxes',
  templateUrl: './user-boxes.component.html',
  styleUrls: ['./user-boxes.component.scss']
})
export class UserBoxesComponent implements OnInit{

  boxDetails:any=[];
  quantity:any=1
  itemQuery:any=''
  itemSearch:any=[];
  isAccordion:any=false

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
    private orderService : OrderService,
    private router : ActivatedRoute,
    private userNotificationService: userNotification,){}


  ngOnInit():void{
    this.orderService.BoxesGet(this.router.snapshot.params['orderId']).subscribe((response: any)=>{
      console.log(response);
      this.boxDetails = response.data;
      this.boxDetails.forEach((dataItem:  any) => {
        // Find matching image from imageArray
        let matchingImage = this.cardsData.find((image: any) => image.header === dataItem.boxType) || this.boxDetails;
        dataItem['boxImg'] = matchingImage.image
      })
    })

/*    const accordionHeader = document.querySelectorAll(".accordion-header");
    accordionHeader.forEach((header) => {
      header.addEventListener("click", function () {
        // @ts-ignore
        const accordionContent = header.parentElement.querySelector(".accordion-content");
        // @ts-ignore
        let accordionMaxHeight = accordionContent.style.maxHeight;

        // Condition handling
        if (accordionMaxHeight == "0px" || accordionMaxHeight.length == 0) {
          // @ts-ignore
          accordionContent.style.maxHeight = `${accordionContent.scrollHeight + 32}px`;
          // @ts-ignore
          header.querySelector(".fas").classList.remove("fa-plus");
          // @ts-ignore
          header.querySelector(".fas").classList.add("fa-minus");
          // @ts-ignore
          header.parentElement.classList.add("bg-indigo-50");
        } else {
          // @ts-ignore
          accordionContent.style.maxHeight = `0px`;
          // @ts-ignore
          header.querySelector(".fas").classList.add("fa-plus");
          // @ts-ignore
          header.querySelector(".fas").classList.remove("fa-minus");
          // @ts-ignore
          header.parentElement.classList.remove("bg-indigo-50");
        }
      });
    });*/
  }

  openAccordion(i:any){

    // @ts-ignore
    const accordionContent = document.querySelector(`.accordion-content_${i}`);

    // @ts-ignore
    let accordionMaxHeight = accordionContent.style?.maxHeight;

    // Condition handling
    if (accordionMaxHeight == "0px" || accordionMaxHeight?.length == 0) {
      // @ts-ignore
      // accordionContent.style.maxHeight = `${accordionContent.scrollHeight + 32}px`;
      accordionContent.style.maxHeight = `max-content`;
      this.isAccordion = true
    } else {
      // @ts-ignore
      accordionContent.style.maxHeight = `0px`;
      this.isAccordion = false
    }
  }

  activeFilters(){
    const resultBox = document.querySelector(".resultBox");
    const activeSearch = document.querySelector(".direct-search");
    // @ts-ignore
    resultBox.classList.add("active");
    // @ts-ignore
    activeSearch.classList.add("active-search");
    this.searchBoxItem();
  }

  removeFilters(){
    const resultBox = document.querySelector(".resultBox");
    const activeSearch = document.querySelector(".direct-search");
    // @ts-ignore
    resultBox.classList.remove("active");
    // @ts-ignore
    activeSearch.classList.remove("active-search");
    this.isAccordion=false
  }

  plusMinus(reqUnit:any,items:any,bid:any,i:any){
    if(reqUnit == "plus"){
      items.quantity=1
      items.plus=true
    } else if (reqUnit == "minus"){
      items.quantity=1
      items.plus=false
    }
    this.orderService.boxItemsUpdate({boxItem:items},bid).subscribe((response: any)=>{
      console.log(response);
      this.userNotificationService.showSuccess('Box are getting updated successfully!');
      this.boxDetails[i].boxItem=response.data.boxItem
    }, (err:any)=>{
      console.log(err)
      this.userNotificationService.showError(err.error.message);
      items.quantity--
    })
  }

  addItem(items:any,bid:any,i:any){
    const boxItem={
      produce: items,
      quantity: 1,
      unit: "kg"
    }
    this.plusMinus('plus',boxItem,bid,i)
  }

  searchBoxItem(){
    console.log(this.itemQuery);
    this.orderService.searchBoxItems(this.itemQuery).subscribe((response: any)=>{
      this.itemSearch = response.data;
      this.userNotificationService.showSuccess('Items are getting successfully!');
      console.log(response);
    }, (err:any)=>{
      console.log(err)
      this.userNotificationService.showError(err.error.message);
    })
  }
}
