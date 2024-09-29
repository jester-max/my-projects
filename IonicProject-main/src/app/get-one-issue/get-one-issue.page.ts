import { Component, OnInit } from '@angular/core';
import {ServiceService} from "../service.service";
import {ActivatedRoute} from "@angular/router";
import {Camera, CameraResultType, CameraSource} from "@capacitor/camera";

@Component({
  selector: 'app-get-one-issue',
  templateUrl: './get-one-issue.page.html',
  styleUrls: ['./get-one-issue.page.scss'],
})
export class GetOneIssuePage implements OnInit {
// for the toast status
  isToastOpen = false;
  class:any
  icon:any
  message:any
  alertButtons = ['Cancel','Delete'];

  image:any

  // for the get item from database
  GetOneIssueData:any
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
    this.service.GetOneIssue(this.ActiveRouter.snapshot.params['issueId']).subscribe((res:any)=>{
      this.GetOneIssueData = res.data
      this.message=res.message
      this.toastOpen(res.status)
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
