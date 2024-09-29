import { Injectable } from '@angular/core';
import {RESTAPIService} from "./restApi.service";
import {environment} from "../../core/constants/variables";
import { Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LocationService{
  deliveryDates: any;
  currentRoute: string | null = null;
  constructor(private restApi: RESTAPIService, private router : Router) {

    this.deliveryDates = sessionStorage.getItem('del_dates');

    this.router.events.subscribe(() => {
      this.updateCurrentRoute(router.url)})

  }
  private updateCurrentRoute(url:string): void {
    this.currentRoute = url;
  }
  findZone(pincode:string){
   return this.restApi.get(`${environment.apiUrl}check/deliveryAvailability/${pincode}`)
  }
  setDeliveryDates(dates: any) {
    this.deliveryDates = dates;
    sessionStorage.setItem('del_dates',JSON.stringify(this.deliveryDates))
  }

  getDeliveryDates() {
    return this.deliveryDates;
  }
  checkRoute(): string | null {
    if (this.currentRoute?.startsWith('/product/customize') ) {
      return 'customizeComponent';
    } else if (this.currentRoute === 'testComponent') {
      return 'testComponent';
    }
    return null;
  }
}
