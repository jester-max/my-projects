import { Component } from '@angular/core';

@Component({
  selector: 'app-custome-dashboard',
  templateUrl: './custome-dashboard.component.html',
  styleUrls: ['./custome-dashboard.component.css']
})
export class CustomeDashboardComponent {

  checked(target: any) {
    if (target.checked){
      console.log(target.checked)
      // @ts-ignore
      document.getElementById('footer-link').classList.add('footer-link-checked')
    } else {
      console.log(target.checked)
      // @ts-ignore
      document.getElementById('footer-link').classList.remove('footer-link-checked')
    }
  }
}
