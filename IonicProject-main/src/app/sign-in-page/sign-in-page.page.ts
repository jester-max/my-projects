import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../service.service";
import {StatusBar} from "@capacitor/status-bar";


@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.page.html',
  styleUrls: ['./sign-in-page.page.scss'],
})
export class SignInPagePage implements OnInit {

  password:any
  iconPassword:any
  message:any

  constructor(private router:Router,private ActiveRouter:ActivatedRoute,private service:ServiceService) { }


  ngOnInit() {
    StatusBar.setBackgroundColor({color:'#3880ff'})
  }

  login(data:any){
    console.log(data)
    this.service.login(data).subscribe((res:any)=>{
      console.log(res)
      if (res.status==='SUCCESS'){
        localStorage.setItem('jwt-token', res.data.token);
        localStorage.setItem('csrf-token', res.data.CSRFToken);
        this.router.navigate(['/dashboard'])
      } else if (res.status === 'PENDING'){
        this.message = res.message
      } else {
        this.message = res.message
      }
    })
    // this.router.navigate(['/scanner/',"ankit"])
  }

  showHidePassword(){
    this.password = document.getElementById('password-login');
    this.iconPassword = document.getElementById('icon-password-login');
    if (this.password?.type == 'password') {
      this.password.setAttribute('type', 'text');
      this.iconPassword.classList.add('show-password-login');
    } else {
      this.password.setAttribute('type', 'password');
      this.iconPassword.classList.remove('show-password-login');
    }
  };

}
