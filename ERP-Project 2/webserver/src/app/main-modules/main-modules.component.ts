import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main-modules',
  templateUrl: './main-modules.component.html',
  styleUrls: ['./main-modules.component.css']
})
export class MainModulesComponent {
  constructor(private router:Router,private routerr:ActivatedRoute) {}

  goTo() {
    this.router.navigate([`/customise/${this.routerr.snapshot.params['_id']}`])
  }
}
