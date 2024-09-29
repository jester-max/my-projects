import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ServicesService} from "../services.service";
import {ActivatedRoute, Router} from "@angular/router";
import {search} from "ionicons/icons";

@Component({
  selector: 'app-user-box-items',
  templateUrl: './user-box-items.page.html',
  styleUrls: ['./user-box-items.page.scss'],
})
export class UserBoxItemsPage implements OnInit {
  boxItems: any[] = [];
  itemQuery:any=''

  constructor(public navCtrl: NavController, private service: ServicesService, private activeRoute: ActivatedRoute) { }

  public results:any = []
  public showResults = false;

  search() {
    this.service.searchBoxItems(this.itemQuery).subscribe((res: any) => {
      console.log(res);
      this.results = res.data
    })
  }

  handleFocus() {
    this.showResults = true;
    this.search()
  }


  ngOnInit() {
    this.service.getBoxItems(this.activeRoute.snapshot.params['id']).subscribe((res: any) => {
      if (res.status === 'Success') {
        this.boxItems = res.data.boxItem;
        console.log(this.boxItems);
      } else {
        console.error('Failed to fetch box items', res);
      }
    });
  }

  plusMinus(reqUnit:any,items:any){
    console.log(reqUnit,items)
    let removeItem;
    if(reqUnit == "plus"){
      items.quantity=1
      items.plus=true
    } else if (reqUnit == "minus"){
      items.quantity=1
      items.plus=false
    }
    console.log(items)
    this.service.addItems(this.activeRoute.snapshot.params['id'],{boxItem:items}).subscribe((response: any) => {
      // console.log(response.data.boxItem);
      this.boxItems=response.data.boxItem
    }, (err:any)=>{
      console.log(err)
      items.quantity--
    })
    this.showResults=false
  }

  addItems(items:any){
    const boxItem={
      produce: items,
      quantity: 1,
      unit: "kg"
    }
    this.plusMinus('plus',boxItem)
  }




}
