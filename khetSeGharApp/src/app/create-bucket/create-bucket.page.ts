import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServicesService} from "../services.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-create-bucket',
  templateUrl: './create-bucket.page.html',
  styleUrls: ['./create-bucket.page.scss'],
})
export class CreateBucketPage implements OnInit {

  boxSizeDetails:any

  constructor(public activeRoute: ActivatedRoute,private service:ServicesService, public navCtrl: NavController) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((queryId:any)=>{
      this.service.getBucketContent(queryId.header).subscribe((res:any)=>{
        this.boxSizeDetails = res.data
        console.log(this.boxSizeDetails)
      })
    });
  }

}
