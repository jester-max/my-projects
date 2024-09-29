import {Component, ElementRef, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {CollectionAgentService} from "../../collection-agent.service";
import {interval, startWith, switchMap} from "rxjs";
import {io} from "socket.io-client";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent {

  showOtpBox: boolean = false;
  notifications: any[] = [];
  notificationCount: number = 0;
  isNotificationOpen = false;
  hasNotifications: boolean = false;
  clickCount: number = 0;
  constructor(private router:Router ,private agentService:CollectionAgentService,private elementRef:ElementRef) {}

  userData: any;


  ngOnInit(): void {

    if (!this.agentService.isLoggedIn()) {
      this.router.navigate(['collection-center/agent/signing'])
    }

    // Call a method to fetch data from a service
    this.getProfile();
    this.monitorProductStatus()
  }


  getProfile() {
    this.agentService.getAgentProfile().subscribe((res:any)=>{

      this.userData = res.data;

    })

  }

/*
  monitorProductStatus() {
    interval(30000) // Poll every 30 seconds
      .pipe(
        startWith(0), // Start immediately on load
        switchMap(() => this.agentService.getFarmerProcessData())
      )
      .subscribe((res: any) => {

        if (res && res.data && res.data.length) {
          this.addNotification(res.data);
        }
      },error => {
        console.log(error ,'errr sudarshan')
      })
  }*/


  monitorProductStatus() {

    this.agentService.getFarmerProcessData().subscribe((res: any) => {
        if (res && res.data && res.data.length) {
         this.addNotification(res.data);
        }
      },error => {
        console.log(error ,'errr sudarshan')
      })
  }

  addNotification(data:any) {
    this.notifications = data
    this.notificationCount = this.notifications.length; // Update the notification count
    this.hasNotifications =true
  }

  toggleNotificationModal() {
    this.isNotificationOpen = !this.isNotificationOpen;
    this.monitorProductStatus()
  }


  redirectToProductPage() {
    this.router.navigate(['/collection-center/agent/dashboard/products']); // Update '/product' with the desired route
    this.toggleNotificationModal()
  }


  @HostListener('document:click', ['$event'])
  clickOutside() {
    if(this.isNotificationOpen && this.clickCount===0){
      this.isNotificationOpen = true
      this.clickCount++
    }else {
      this.isNotificationOpen = false
      this.clickCount = 0
    }
  }

}
