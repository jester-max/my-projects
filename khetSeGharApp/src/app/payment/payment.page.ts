import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  paymentMethod: string;

  constructor(public navCtrl: NavController, public router:Router) {
    this.paymentMethod = 'cod';

  }
  selectPaymentMethod(method: string) {
    this.paymentMethod = method;
    console.log('Selected payment method:', this.paymentMethod);

  }
  ngOnInit() {
  }

}
