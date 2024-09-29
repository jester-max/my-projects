import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AdminDashboardService} from "../dashboard/admin-dashboard-service";
import {Router} from "@angular/router";
import {userNotification} from "../../../shared/services/userNotification.service";
import {initFlowbite, initModals, initPopovers, initTabs, initTooltips} from "flowbite";
import {IResponse} from "../../../shared/interfaces/response.interface";
import {IAdminUser} from "../../../shared/interfaces/admin-user.interface";
import {RESTAPIService} from "../../../shared/services/restApi.service";
import {environment} from "../../../core/constants/variables";
import { Clipboard } from '@angular/cdk/clipboard';
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-header-admin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit{
  adminDetails? : Observable<IResponse<IAdminUser>>
  accessCode : string ='';
  isCopied: boolean = false;

  constructor(public adminDashboardService : AdminDashboardService,
              private router : Router,
              private userNotificationService :userNotification,
              private restApi : RESTAPIService,
              private clipboard:Clipboard,
              private cdr: ChangeDetectorRef
  ) {
    initFlowbite();

  }
  ngOnInit() {

      this.adminDetails = this.adminDashboardService.adminData();
      console.log(this.adminDetails)
  }


  logout(){
    localStorage.removeItem('accessToken');
    this.router.navigate(['/admin/login']);
    this.userNotificationService.showError('logged out successfully');
  }
  hideDropdown(){
    document.getElementById("dropdown")?.classList.add("hidden"); //hide the dropdown
  }

  generateAccessCode() {

    this.restApi.get(`${environment.apiUrl}access-code`).pipe(
      tap((response:any)=>{
        console.log('response',response)
        this.accessCode = response.accessCode;
        this.cdr.detectChanges();
      })
    ).subscribe();

  }
  copyAccessCodeToClipboard() {
    if (this.accessCode) {
      // this.clipboard.copy(this.accessCode);
      // this.isCopied = true;
      //
      // setTimeout(() => {
      //   this.isCopied = false;
      // }, 2000);
      const successMessage = document.getElementById('success-message');
      successMessage?.classList.remove('hidden');
      const defaultMessage = document.getElementById('default-message');
      defaultMessage?.classList.add('hidden');

      setTimeout(
        ()=>{
          successMessage?.classList.add('hidden');
          defaultMessage?.classList.remove('hidden');


        },1000
      )
    }
  }
}
