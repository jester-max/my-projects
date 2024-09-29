import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {CollectionAgentService} from "../../collection-agent.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private router:Router,private agentService:CollectionAgentService) {}

  showOtpBox: boolean = false;
  userData: any;
  showAddress: boolean = false;
  newAddress: string = '';


  ngOnInit(): void {

    if (!this.agentService.isLoggedIn()) {

      this.router.navigate(['collection-center/agent/signing'])
    }
    // Call a method to fetch data from a service
    this.getProfile();
  }

  logout() {

    localStorage.removeItem('accessToken');
    setTimeout(()=>{
      this.router.navigate(['collection-center/agent/signing'])
    },1000)

  }

   getProfile() {
    this.agentService.getAgentProfile().subscribe((res:any)=>{
      this.userData = res.data;
    })
  }

  showAddressSection() {
    this.showAddress = true;
  }

  toggleAddress() {
    this.showAddress = !this.showAddress;
  }

  saveAddress() {
    // Implement save address functionality here
    // After saving the address, you may want to hide the input fields
    this.showAddress = false;
  }

}
