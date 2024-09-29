import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LocationService} from "../../services/location.service";
import {filter, Observable, shareReplay} from "rxjs";
import {tap} from "rxjs/operators";
import {NavigationStart, Router} from "@angular/router";
import {initFlowbite} from "flowbite";

@Component({
  selector: 'app-check-location',
  templateUrl: './check-location.component.html',
  styleUrls: ['./check-location.component.scss'],
})
export class CheckLocationComponent implements OnInit {
  locationResult$!: Observable<any>;
  pinCode: string | null= '';
  deliveryDate:any;
  isFirstPage!: boolean;
  @ViewChild('zipcodeInput') inputField!: ElementRef;

  constructor(public locationService: LocationService,
              public router: Router
              ) {
  }

  ngOnInit() {
    initFlowbite()
  if(this.router.url==='/'){
    this.isFirstPage =true
  }
    this.pinCode =   sessionStorage.getItem('u_pc');
    if(this.pinCode){
       this.checkLocation();
    }
  }

  checkLocation() {
    if (!this.pinCode) {
      return;
    }
    this.locationResult$ = this.locationService.findZone(this.pinCode).pipe(shareReplay(1));
    this.locationResult$.subscribe((dates: any) => {
      console.log('dates', typeof dates.available);
      if (dates.available) {
        this.locationService.setDeliveryDates(dates.deliveryDates);
        this.deliveryDate = dates.deliveryDates[0].split(',')[0].trim();
        sessionStorage.setItem('isDeliveryAvail', dates.available);
        if (typeof this.pinCode === 'string') {
          sessionStorage.setItem('u_pc', this.pinCode);
        }
      } else {
        sessionStorage.setItem('isDeliveryAvail', dates.available);
        if (typeof this.pinCode === 'string') {
          sessionStorage.setItem('u_pc', this.pinCode);
        }
      }
    });
  }

  changeLocation(): void {
    sessionStorage.removeItem('u_pc');
    sessionStorage.removeItem('isDeliveryAvail');
    this.pinCode = '';
    this.inputField.nativeElement.focus();
  }

  refreshPage(){
    location.reload(); // reloads the page
  }
}
