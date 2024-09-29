import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ServiceService} from "../service.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  constructor(private http:HttpClient,private service:ServiceService) { }

  savedata(data:any){
    this.service.test(data).subscribe((res:any)=>{
      console.log(res)
    })
  }
  ngOnInit() {
  }

}
