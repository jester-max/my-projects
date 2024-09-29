import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {DatePipe} from "@angular/common";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-get-one-item',
  templateUrl: './get-one-item.page.html',
  styleUrls: ['./get-one-item.page.scss'],
})
export class GetOneItemPage implements OnInit {

  // for the toast status
  isToastOpen = false;
  class:any
  icon:any
  message:any
  alertButtons = ['Cancel','Delete'];

  image:any

  // for the get item from database
  GetOneItemData:any

  constructor(private service:ServiceService,public ActiveRouter:ActivatedRoute) { }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source:CameraSource.Prompt,
      saveToGallery:true
    });
    this.image = image.dataUrl
  }

  ngOnInit() {
    this.service.GetOneItem(this.ActiveRouter.snapshot.params['itemId']).subscribe((res:any)=>{
      this.message=res.message
      this.toastOpen(res.status)
      this.GetOneItemData = res.data
      console.log(res)
    })
  }

  toastOpen(isOpen: any) {
    this.isToastOpen = isOpen;
    if (isOpen === 'SUCCESS'){
      this.class = isOpen
      this.icon = 'checkmark-done-outline'
    } else if (isOpen === 'PENDING'){
      this.class = isOpen
      this.icon = 'alert-circle-outline'
    } else if (isOpen === 'ERROR'){
      this.class = isOpen
      this.icon = 'remove-circle-outline'
    }
  }

}
