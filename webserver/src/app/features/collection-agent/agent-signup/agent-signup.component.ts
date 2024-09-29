import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CollectionAgentService} from "../collection-agent.service";

@Component({
  selector: 'app-agent-signup',
  templateUrl: './agent-signup.component.html',
  styleUrls: ['./agent-signup.component.scss']
})
export class AgentSignupComponent {


  registrationAgent: FormGroup;
  image:any;
  errorMessage: string = '';
  successMessage: string = '';
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder, private router: Router,private registrationService:CollectionAgentService ) {


    this.registrationAgent = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/)]],
      // password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
      accessCode:['',[Validators.required]],
      contact: ['', [Validators.required, ]],
      //image:['',[Validators.required]],
    },{ validator: this.ConfirmPasswordValidator('password', 'confirmPassword') });

  }

  registrationToAgent() {

    if (this.registrationAgent.valid) {

      const registrationData = new FormData();
      registrationData.append('firstName',this.registrationAgent.get('firstName')?.value);
      registrationData.append('lastName',this.registrationAgent.get('lastName')?.value);
      registrationData.append('password',this.registrationAgent.get('password')?.value);
      registrationData.append('email',this.registrationAgent.get('email')?.value);
      registrationData.append('accessCode',this.registrationAgent.get('accessCode')?.value);
      registrationData.append('contact',this.registrationAgent.get('contact')?.value);
      registrationData.append('image',this.image)


      this.registrationService.registrationAgent(registrationData).subscribe((res:any)=>{

        this.errorMessage = '';
        this.successMessage = res.message;

          setTimeout(()=>{
            this.router.navigate(['collection-center/agent/signing'])
          },1000)

        },((error:any)=>{
        this.errorMessage = error.error.message || 'An error occurred.';

        })
      )
    }
  }

  previewImage(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }else {
      this.imagePreview = null;
    }
  }


  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {

        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  checkFormValidity() {
    this.errorMessage = '';
    this.successMessage = '';
  }
  showMessages:boolean =false;
  loginMessages:any;
  passmess:any;


  showPasswordMessages() {
    this.loginMessages = this.registrationService
    this.showMessages =true;
  }

  hideMessages(){
    this.showMessages =false;
  }

  ngOnInit() {}




}
