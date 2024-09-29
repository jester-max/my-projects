import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  backTo:any
  constructor(public ActiveRouter:ActivatedRoute) { }

  ngOnInit() {
    this.backTo = this.ActiveRouter.snapshot.params['where']
    console.log(this.backTo)
  }

}
