import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServiceService} from "../service.service";

@Component({
  selector: 'app-issue-table',
  templateUrl: './issue-table.page.html',
  styleUrls: ['./issue-table.page.scss'],
})
export class IssueTablePage implements OnInit {
  page=1
  size = 20;
  data:any
  constructor(public ActiveRouter:ActivatedRoute,private service:ServiceService) { }

  ngOnInit() {
    this.service.verifyIssue(this.page,this.size).subscribe((res:any)=>{
      this.data=res.data
      console.log(res)
    })
  }

  verifying(data:any){
    this.service.verifyingIssue(data).subscribe((res:any)=>{
      console.log(res)
    })
  }

}
