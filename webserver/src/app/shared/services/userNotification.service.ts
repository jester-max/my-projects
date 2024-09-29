import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class userNotification{
  private successMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public successMessage$: Observable<string> = this.successMessageSubject.asObservable();
  private errorMessageSubject:BehaviorSubject<string> = new BehaviorSubject<string>('');
  public errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();
  private alertMessageSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  public alertMessage$ :Observable<string> = this.alertMessageSubject.asObservable();
  constructor() {
  }
  showSuccess(message: string): void {
    this.successMessageSubject.next(message);
  }
  showError(message: string): void {
    console.log('mess:',message)
    this.errorMessageSubject.next(message);
  }
  showAlert(message: string): void {
    console.log('message',message)
    this.alertMessageSubject.next(message);
  }
}
