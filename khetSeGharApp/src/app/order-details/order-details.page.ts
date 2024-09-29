import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {ServicesService} from "../services.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  orderId: string = '';
  orders: any[] = [];
  orderDetails: any;
  userBox: any;
  constructor(private route: ActivatedRoute,private router:Router ,private service:ServicesService,public navCtrl: NavController) { }



  ngOnInit() {
    this.orderId = this.route.snapshot.params['id'];
    this.fetchAllOrders();
  }


  fetchAllOrders() {
    this.service.getOder().subscribe(
      (data: any) => {
        console.log('Orders API Response:', data);
        if (data && data.data) {
          this.orders = data.data;
          this.orderDetails = this.orders.find(order => order._id === this.orderId);
          console.log('Order Details:', this.orderDetails);
        }
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }


  // getUserBox(){
  //   const orderId = this.orderDetails?.orderId;
  //   if (orderId) {
  //     this.service.getUserBox(orderId).subscribe(
  //       data => {
  //         this.userBox = data;
  //         this.router.navigate(['/user-box/',orderId]);
  //       },
  //       error => {
  //         console.error('Error fetching user box', error);
  //       }
  //     );
  //   }
  // }





  }
