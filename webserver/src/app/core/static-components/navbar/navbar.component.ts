import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {initFlowbite} from "flowbite";
import {Observable} from "rxjs";
import {MainAuth} from "../../services/mainAuth";
import {CustomDatePipe} from "../../../shared/pipes/custom-date";
import {userNotification} from "../../../shared/services/userNotification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[CustomDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  hasName:boolean = false;
  private authService = inject(AuthService);
  public mainAuth = inject(MainAuth)
  currentUser$?: Observable<any>;
  isOpenDropdown:any=false
  constructor(private notificationService: userNotification,
              private router : Router) {}

  ngOnInit() {
     initFlowbite()

     const $targetEl = document.getElementById('avatarButton');

     // set the element that trigger the dropdown menu on click
     const $triggerEl = document.getElementById('dropdownButton');

     this.isLoggedIn = this.mainAuth.isLoggedIn();

     this.currentUser$ = this.authService.getCurrentUser();

  }

  logout(){
    localStorage.clear();
    this.notificationService.showSuccess('Logged out successfully');
    this.router.navigate(['/']);
    location.reload();
  }
}
