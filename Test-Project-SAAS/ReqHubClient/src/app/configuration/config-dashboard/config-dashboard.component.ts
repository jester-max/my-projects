import { Component } from '@angular/core';

@Component({
  selector: 'app-config-dashboard',
  templateUrl: './config-dashboard.component.html',
  styleUrls: ['./config-dashboard.component.css']
})
export class ConfigDashboardComponent {
  toggleTrue:any=true

  constructor() {}

  toogle() {
    if (this.toggleTrue){
      // @ts-ignore
      document.getElementById('panel-toggle').classList.add('side-expend')
      this.toggleTrue = false
    } else {
      // @ts-ignore
      document.getElementById('panel-toggle').classList.remove('side-expend')
      this.toggleTrue = true
    }
  }
}
