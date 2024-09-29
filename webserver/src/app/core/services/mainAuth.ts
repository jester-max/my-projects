import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {userNotification} from "../../shared/services/userNotification.service";


@Injectable()
export class MainAuth {
  payload: any;
  parsedPayload: any;
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(private userNotificationService : userNotification) {
  }
  isLoggedIn() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.payload = atob(token.split('.')[1]);
      this.parsedPayload = JSON.parse(this.payload);

      if (this.parsedPayload.exp > Date.now() / 1000) {
        // User is logged in and the token is still valid
        return true;
      } else {
        this.userNotificationService.showAlert('Token has expired. Please log in again.')
        // Token has expired, so log the user out
        this.logout();
        return false;
      }
    } else {
      // No token found, user is not logged in
      return false;
    }
  }


  logout() {
    localStorage.removeItem('accessToken');
    this.loggedIn.next(false);
  }
}
