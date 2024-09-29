import { Component } from '@angular/core';
import {ServiceService} from "../service.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
// @ts-ignore
import AOS from 'aos';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  id: any = '';
  name: any = '';
constructor(private service:ServiceService, private router:Router,private toast:NgToastService) {}

  ngOnInit():void{
    AOS.init();
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // @ts-ignore
    signUpButton.addEventListener('click', () => {
      // @ts-ignore
      container.classList.add("right-panel-active");
    });

    // @ts-ignore
    signInButton.addEventListener('click', () => {
      // @ts-ignore
      container.classList.remove("right-panel-active");
    });
  }
  signIn(data:any) {

    this.service.addTenant(data)
      .subscribe((res:any)=>{
        if (res.page === "configuration"){
          this.toast.success({detail:res.Status,summary:'Your Account is Successfully Created'})
          this.router.navigate(['main/',res.data.tenantID])
        } else if (res.page === "home"){
          this.toast.success({detail:res.Status,summary:'Your Dashboard is Successfully Created'})
          this.router.navigate(['landing-page/',res.data.tenantID])
        }
        console.log(res)
      })
  }
}

