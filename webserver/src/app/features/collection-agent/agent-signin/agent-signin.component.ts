import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CollectionAgentService} from "../collection-agent.service";

@Component({
  selector: 'app-agent-signin',
  templateUrl: './agent-signin.component.html',
  styleUrls: ['./agent-signin.component.scss']
})
export class AgentSigninComponent {

  email: any;
  password: any;
  isFormValid: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router,private loginService: CollectionAgentService) {}

  LoginToAgent() {

    this.loginService.LoginCollectionAgent(this.email, this.password).subscribe((res:any)=>{

      this.errorMessage = '';
      this.successMessage = res.message;

       if (res.accessToken) {
         localStorage.setItem('accessToken', res.accessToken); // Store token in localStorage
       }

      // Clear input fields
      this.email = '';
      this.password = '';

      setTimeout(()=>{
        this.router.navigate(['collection-center/agent/dashboard/home'])
      },1000)

    },(error:any)=>{
      // Handle error response
      console.error('Login error:', error);
      // Extract error message
      this.errorMessage = error.error.message || 'An error occurred.';

    })
  }


  checkFormValidity() {
    this.isFormValid = this.email && this.password;
    // Clear error message when new input is detected
    this.errorMessage = '';
    this.successMessage = '';
  }

}
