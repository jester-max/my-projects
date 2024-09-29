import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {StotageServiceService} from "../services/stotage.service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private storageService:StotageServiceService) { }

  canActivate(): boolean {
    const accessToken = this.storageService.get('accessToken');
    if (accessToken) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
