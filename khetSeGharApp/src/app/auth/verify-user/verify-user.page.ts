import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ServiceService} from "../service.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.page.html',
  styleUrls: ['./verify-user.page.scss'],
})
export class VerifyUserPage implements OnInit {

  otp: FormGroup;

  constructor(private formBuilder : FormBuilder, private service : ServiceService,
              private activatedRoute : ActivatedRoute,) {
    this.otp = this.formBuilder.group({
      otp: ['',[Validators.required]],
      contact:[this.activatedRoute.snapshot.params['contact'],[Validators.required]]
    });
  }

  ngOnInit() {
    console.log(this.otp.get('contact')?.value)
  }

  verifyOTP() {
    console.log('otp',this.otp.value)
    this.service.verifyOTP(this.otp.value).subscribe((res:any)=>{
      console.log(res)
    })
  }

}
