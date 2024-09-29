import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceService} from "../service.service";
import {bootstrapApplication} from "@angular/platform-browser";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  data:any
  constructor(private service:ServiceService,private router:Router,public ActiveRouter:ActivatedRoute) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.service.scanResult(this.ActiveRouter.snapshot.params['barcodeNum']).subscribe((res:any)=>{
      this.data=res.data
      console.log(this.data)
    })
  }
  on() {
    // @ts-ignore
    // document.getElementById("overlay").style.display = "flex";
    // console.log(this.ActiveRouter.snapshot.params['userId'])
    this.service.issue(this.data).subscribe((res:any)=>{
      // this.router.navigate(['/scanner',this.ActiveRouter.snapshot.params['userId']])
      console.log(res)
    })
  }
}
