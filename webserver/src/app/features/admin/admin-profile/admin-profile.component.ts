import {Component, NgZone} from '@angular/core';
import {Observable} from "rxjs";
import {IResponse} from "../../../shared/interfaces/response.interface";
import {IAdminUser} from "../../../shared/interfaces/admin-user.interface";
import {AdminDashboardService} from "../dashboard/admin-dashboard-service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {userNotification} from "../../../shared/services/userNotification.service";
import {initFlowbite, initModals, initPopovers, initTabs, initTooltips, Modal} from "flowbite";
import {capitalize} from "lodash";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss'],
})
export class AdminProfileComponent {
  adminUpdate: FormGroup;
  adminDetails?: Observable<IResponse<IAdminUser[]>>;
  constructor(
    public adminDashboardService: AdminDashboardService,
    private fb: FormBuilder,
    private userNotificationService: userNotification,
    private ngZone: NgZone ) {
    this.adminUpdate = this.fb.group({
      firstName: ['', [ Validators.minLength(3)]],
      lastName: ['', [ Validators.minLength(3)]],
      city: ['', [ Validators.minLength(3)]],
      zipCode: ['', [ Validators.min(6)]],
      village: ['', [ Validators.minLength(3)]],
      state: ['', [ Validators.minLength(3)]],
      region: ['', [ Validators.minLength(3)]],
      streetAddress: ['', [ Validators.minLength(3)]],
      district: ['', [ Validators.minLength(3)]],
      contact: ['', [ Validators.min(10)]],
    });

    // Subscribe to adminDetails$ Observable to get the current admin details
    this.adminDashboardService.adminDetails$.subscribe(adminDetails => {
      if (adminDetails) {
       const capitalizeFirstLetter = (str: string) => {
          return str?.charAt(0).toUpperCase() + str.slice(1);
        };
        // Patch the current admin details to the form controls
        this.adminUpdate.patchValue({
          firstName: capitalizeFirstLetter(adminDetails.data.firstName),
          lastName: capitalizeFirstLetter(adminDetails.data.lastName),
          city: capitalizeFirstLetter(adminDetails.data.address.city),
          zipCode: capitalizeFirstLetter(adminDetails.data.address.zipCode),
          village: capitalizeFirstLetter(adminDetails.data.address.village),
          state: capitalizeFirstLetter(adminDetails.data.address.state),
          region: capitalizeFirstLetter(adminDetails.data.address.region),
          streetAddress: capitalizeFirstLetter(adminDetails.data.address.streetAddress),
          district: capitalizeFirstLetter(adminDetails.data.address.district),
          contact: capitalizeFirstLetter(adminDetails.data.contact)
        });
      }
    });
  }

  update() {
    capitalize('aditya')

    if (this.adminUpdate.valid) {
      // If form is valid, proceed with updating the user
      const userData = this.adminUpdate.value;
      console.log('user data', userData);
      this.adminDashboardService.updateAdmin(userData).subscribe(
        (response: any) => {
          console.log('response',response)
          // Update the form with the updated data
          this.adminUpdate.patchValue({
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            city: response.data.address.city,
            zipCode: response.data.address.zipCode,
            village: response.data.address.village,
            state: response.data.address.state,
            region: response.data.address.region,
            streetAddress: response.data.address.streetAddress,
            district: response.data.address.district,
            contact: response.data.contact
          });
          this.userNotificationService.showSuccess('User updated successfully');

          // this.closeUserModal();
        },
        (error: any) => {
          console.error('Error updating user:', error);
          const validateError = error.error.errors.length > 0 ? error.error.errors[0].msg : '';
          console.log('show error:', validateError);
          this.userNotificationService.showError(validateError || error.error.message);
        },
      );
    } else {
      // If form is invalid, mark all fields as touched to display validation errors
      this.adminUpdate.markAllAsTouched();
    }
  }
  ngOnInit() {
    console.log('hi from admin profileComponent');
    setTimeout(() => {
      initFlowbite();
      initModals();
      initPopovers();
      initTabs();
      initTooltips();
    }, 100);
    // this.adminDetails = this.adminDashboardService.adminDetails$();
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.adminUpdate.get(fieldName);
    return (control?.invalid && (control?.dirty || control?.touched)) || false;
  }

  clearError(fieldName: string): void {
    const control = this.adminUpdate.get(fieldName);
    if (control && control.invalid) {
      control.markAsUntouched();
      control.updateValueAndValidity();
    }
  }
  closeUserModal(){
    const $targetEl = document.getElementById('updateUserModal');
    const modal = new Modal($targetEl);
    modal.hide();
  }

}
