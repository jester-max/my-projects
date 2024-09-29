import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {userNotification} from "../../shared/services/userNotification.service";
import {delay, finalize, Observable, of, shareReplay, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {MainAuth} from "../../core/services/mainAuth";
import {environment} from "../../core/constants/variables";
import {Router} from "@angular/router";
import {RESTAPIService} from "../../shared/services/restApi.service";
import {HttpClient} from "@angular/common/http";
import {BucketService} from "../../shared/services/bucket.service";
import {OrderService} from "../../shared/services/order.service";
import {initFlowbite} from "flowbite";
declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  selectedOption: string = 'new';
  currentStep: number = 1;
  loginData: FormGroup;
  isLoading = false;
  showOtpBox: boolean = false;
  signupData!:FormGroup;
  otp:any;
  firstName: string = '';
  lastName: string = '';
  contact: string = '';
  streetAddress: string = '';
  city: string = '';
  state: string = '';
  postalCode: string = '';
  user$?: Observable<any>;
  cart : any=[];
  useDifferentAddress: boolean = false;
  shippingAddress:any;
  billingAddress:any;
  options:any;
  cartImages: { [key: string]: string } = {};
  total: number = 0;
  cardsData:any=[]

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userNotificationService: userNotification,
    private mainAuth : MainAuth,
    private router : Router,
    private http :HttpClient,
    private restApiService:RESTAPIService,
    private bucketService :BucketService,
    private orderService : OrderService,
  ) {
    this.loginData = this.fb.group({
      email: ['', this.customValidator],
      password: ['', Validators.required],
      confirmPassword:['',[Validators.required]],
      contact:['',[Validators.required]]
    },{validator:this.passwordMatchValidator()});
    // this.signupData = this.fb.group({
    //   email:['',[Validators.required,Validators.email]],
    //   password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{10,}$/)]],
    //   confirmPassword:['',[Validators.required]],
    //   termNdCondition:['',[Validators.required]]
    // },{validator:this.passwordMatchValidator()})

    this.cardsData = [{
      image: "assets/images/mix-fruit.jpeg",
      header: "Mix Fruit and Vegetables",
      description: "Get Combination of HandPicked Fruits and vegetables.Good choice for people who don't cook often. ",
      link: "#"
    },
      {
        image: "assets/images/no-cooking.png",
        header: "No Cooking",
        description: "This box is ideal for people who're on the rush, as it contains largely fruit and just quick, easy-to-prepare veggies.",
        link: "#"
      },
      {
        image: "assets/images/fruit-only.webp",
        header: "Fruit Only",
        description: "All fruit! This box includes a lovely mix of luscious, ripe organic fruit. It is ideal for folks who adore fruit for snacking, baking, or juicing.",
        link: "#"
      },
      {
        image: "assets/images/seasonal-fruits.png",
        header: "Seasonal Only",
        description: "This mix contains exclusively produce which contains seasonal fruit and vegetable. ",
        link: "#"
      },
      {
        image: "assets/images/veggie-only.jpeg",
        header: "Veggie Only",
        description: "This organic vegetable mix, recommended for the committed fellow for green vegetables, adds healthy nutrients to your diet. ",
        link: "#"
      },
      {
        image: "assets/images/snack-pack.webp",
        header: "Snack Pack",
        description: "Each box contains easy-to-eat, fresh fruit to keep you and your loved ones team energised and productive.",
        link: "#"
      }];
  }

  customValidator(control:any) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberRegex = /^[0-9]{10}$/;
    const valid = emailRegex.test(control.value) || numberRegex.test(control.value);
    return valid ? null : { invalidEmailOrNum: true };
  }

  ngOnInit() {
    initFlowbite();
    let isLoggedIn = this.mainAuth.isLoggedIn();
    if(!isLoggedIn){
      this.currentStep =1
    }if(isLoggedIn){
      this.currentStep = 2
    }if(sessionStorage.getItem('profileDone')==='true'){
      this.currentStep = 3
    }
    this.user$ = this.authService.getCurrentUser().pipe(shareReplay(1))
    this.user$.subscribe(user => {
      if (user !== null) {
        this.shippingAddress = user.address[0];
        console.log(this.shippingAddress)
      }
    });
    if(!isLoggedIn){
      this.cart = JSON.parse(sessionStorage.getItem('CartContents') as any);
      console.log(this.cart)
      console.log(history.state.cartImage)
      this.cart.forEach((item: any) => {
        // Extract the first word of the box type
        const firstWord = item.boxType;

        // Assign the image URL directly to the specific key in cartImages
        this.cartImages[firstWord] = history.state.cartImage;
      });
      console.log('cartimages',this.cartImages)
      this.calculateTotal();
    }else{
      console.log('hello')
      this.bucketService.getCart().pipe(shareReplay(1),catchError((error:any)=>{
        console.log('error while fetching cart',error);
        this.userNotificationService.showError(error.error.message)
        if (error.error.message==='Cart not found'){
          sessionStorage.removeItem('CartContents')
          this.router.navigate(['/choose/main'])
        }
        return of(error)
      }),tap((res:any)=>{
        console.log('res',res);
        this.cart=res.data.CartContents;
        this.cart.forEach((dataItem:  any) => {
          // Find matching image from imageArray
          let matchingImage = this.cardsData.find((image: any) => image.header === dataItem.boxType);
          dataItem['boxImg'] = matchingImage.image
        })
        for (let cartElement of this.cart) {
          console.log(cartElement)
          this.cart['boxImg'] = history.state.cartImage;
          this.cartImages[cartElement.boxType] = history.state.cartImage;
        }
        console.log('cartimages',this.cart)
        this.calculateTotal();
        if (this.cart.length == 0){
          sessionStorage.removeItem('CartContents')
          this.router.navigate(['/choose/main'])
        }
      })).subscribe();
    }
  }

  next() {
    if (this.selectedOption === 'new') {
      this.signup()
    } else {
      this.loginUser().then(()=>{
        this.currentStep++;
      }).catch((error:any)=>{
        console.error('Login failed:', error);
        this.userNotificationService.showError(error)
      });
    }
  }

  submitDetails() {
    if (this.firstName.trim() === '' || this.lastName.trim() === '' || this.contact.trim() === '') {
      console.log('Please fill in all required fields.');
      this.userNotificationService.showAlert('Please fill in all required fields.')
      return;
    }
    const address ={
      streetAddress: this.streetAddress,
      city: this.city,
      state: this.state,
      zipCode: this.postalCode
    }
    const formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      contact: this.contact,
      address
    };
    this.http.put<any>(`${environment.apiUrl}user/update`, formData)
      .subscribe(
        (response:any) => {
          // Handle successful response
          console.log('Response from backend:', response);
          this.shippingAddress = response.updatedUser.address[0]
          console.log('Response from backend:', this.shippingAddress);
          this.userNotificationService.showSuccess('Profile updated Successfully');
          sessionStorage.setItem('profileDone','true');
          this.currentStep++

          // Proceed to the next step or perform any other action
        },
        (error:any) => {
          // Handle error
          console.error('Error while submitting details:', error);
          this.userNotificationService.showSuccess(error.error)

          // Display error message to the user if needed
        }
      );

  }

  billingInfo() {
    // this.currentStep++;
    console.log('diff add',this.useDifferentAddress);
    if(this.useDifferentAddress){
      const address ={
        streetAddress: this.streetAddress,
        city: this.city,
        state: this.state,
        zipCode: this.postalCode
      }
      const formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        contact: this.contact,
        address
      };
      console.log('formdata',formData);
      sessionStorage.setItem('billing-address',JSON.stringify(formData));
      this.currentStep++
    }else{
      sessionStorage.setItem('billing-address',JSON.stringify(this.shippingAddress));
      this.currentStep++
    }
  }

  loginUser(): Promise<void> {
    console.log('login data',this.loginData)
    return new Promise<void>((resolve, reject) => {
      this.isLoading = true;

      if (this.loginData) {
        const credentials = this.loginData.value;
        credentials.cart = sessionStorage.getItem('boxData');

        this.authService.login(credentials)
          .pipe(
            delay(500),
            tap(() => {
              this.isLoading = false;
              console.log('Login successful');
              this.userNotificationService.showSuccess('Login successful');
              sessionStorage.removeItem('boxData');
              resolve(); // Resolve the promise when login is successful
            }),
            catchError((error) => {
              console.log('Error in ts while login :', error);
              this.userNotificationService.showError(error);
              this.isLoading = false;
              reject(error);
              return throwError(error);
            }),
          ).subscribe();
      } else {
        // If the form is invalid, reject the promise with an appropriate error message
        reject('Invalid login data');
      }
    });
  }

  verifyOTP() {
    console.log('otp',this.otp)
    const numberRegex = /^[0-9]{10}$/;
    const valid = numberRegex.test(this.loginData.get('contact')?.value)
    if (valid){
      const data={
        otp:this.otp,
        contact:this.loginData.get('contact')?.value
      }
      this.authService.verifyPhoneOtp(data).subscribe(
        (response) => {

          console.log('OTP verified successfully', response);
          const regData = this.loginData.value;
          regData.cart = sessionStorage.getItem('boxData')

          this.authService.addUser(regData).pipe(
            tap((response:any)=>{
              console.log('response',response);
              if(response.status==='success' || response.status===200){
                this.userNotificationService.showSuccess('Your Account Created Successfully');
                this.currentStep++
                window.location.reload();
              }
            }),
            catchError((error:any)=>{
              console.log('error while adding the user :',error);
              this.isLoading = false;
              this.userNotificationService.showError(error.error.error);

              return throwError(error);
            })
          ).subscribe();
        },
        (error) => {

          console.error('Error verifying OTP:', error);
          this.userNotificationService.showError(error.error.message)
        }
      );
    } else {
      this.authService.verifyOtp( this.otp).subscribe(
        (response) => {

          console.log('OTP verified successfully', response);
          const regData = this.loginData.value;
          regData.cart = sessionStorage.getItem('boxData')

          this.authService.addUser(regData).pipe(
            tap((response:any)=>{
              console.log('response',response);
              if(response.status==='success' || response.status===200){
                this.userNotificationService.showSuccess('Your Account Created Successfully');
                this.currentStep++
                window.location.reload();
              }
            }),
            catchError((error:any)=>{
              console.log('error while adding the user :',error);
              this.isLoading = false;
              this.userNotificationService.showError(error.error.error);

              return throwError(error);
            })
          ).subscribe();
        },
        (error) => {

          console.error('Error verifying OTP:', error);
          this.userNotificationService.showError(error.error.message)
        }
      );
    }
  }

  resendOtp(){
    const emailAddr = this.signupData.get('email')?.value;
    console.log('email address',emailAddr);
    this.restApiService
      .post(`${environment.apiUrl}sendOtpMail/registration`, { email:emailAddr })
      .subscribe(
        (res: any) => {
          console.log('response from otp', res);
        },
        (err: any) => {
          console.log('error while resending otp', err);
        },
      );

  }

  passwordMatchValidator(){
    return (formGroup: FormGroup): ValidationErrors | null => {
      const passwordControl = formGroup.get('password');
      const confirmPasswordControl = formGroup.get('confirmPassword');

      if (passwordControl?.value !== confirmPasswordControl?.value) {
        confirmPasswordControl?.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl?.setErrors(null);
        return null;
      }
    };
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.loginData.get(fieldName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }

  clearError(fieldName: string): void {
    const control = this.loginData.get(fieldName);
    if (control && control.invalid) {
      control.markAsUntouched();
      control.updateValueAndValidity();
    }
  }

  signup(){
    this.isLoading = true;
    const regData = this.loginData.value;
    console.log('registration data :',regData,this.loginData.valid);
    if(this.loginData.valid){
      console.log('hello',sessionStorage.getItem('boxData'))
      const numberRegex = /^[0-9]{10}$/;
      const valid = numberRegex.test(regData.contact)
      if (valid){
        this.restApiService.post(`${environment.apiUrl}sendOtpPhone/registration`, {contact:regData.contact}).subscribe((res:any)=>{
          console.log('response from otp',res)
          this.userNotificationService.showSuccess('Otp Sent Successfully');
          this.showOtpBox = true;
        },(err:any)=>{
          console.log('error while sending otp',err)
          return throwError(err);
        })
      }
    } else {
      console.log('hey')
      this.loginData.markAllAsTouched();
      this.isLoading = false;
    }
  }

  createOrder() {
    const orderDetails ={
      "shippingAddress":this.shippingAddress,
      "billingAddress":sessionStorage.getItem('billing-address') || undefined,
      "paymentMethod":'COD'
    }
    console.log(orderDetails)
    this.orderService.OrderCreate(orderDetails).subscribe(
      (response) => {
   /*     this.options = {
          "key": "rzp_test_3s0ucd48fNHqBG", // Enter the Key ID generated from the Dashboard
          "amount": response.data.amount,
          "currency": "INR",
          "name": "KHET SE GHAR", "order_id": response.data.id,
          "handler": this.handlePayment.bind(this),
          // this.service.post(`http://localhost:8080/v1/verify`,res)
          //"callback_url": 'http://localhost:8080/v1/verify',
          theme:{
            "color":"#65a30d"
          },
          modal: {
            confirm_close: true, // this is set to true, if we want confirmation when clicked on cross button.
            // This function is executed when checkout modal is closed
            // There can be 3 reasons when this modal is closed.
            ondismiss: async () => {
              this.deleteOrderById(response.data.id)
            },
          },
        }

        var rzpy = new Razorpay(this.options)

        rzpy.on('payment.failed',  (response:any)=>{
          const orderId = response.error.metadata.order_id;
          const payment_id = response.error.metadata.payment_id;
          const data = {
            razorpay_order_id: orderId,
            razorpay_payment_id: payment_id
          };
          this.sendFailedPaymentData(data)
        });
        rzpy.open()*/
        console.log(response)
        this.userNotificationService.showSuccess('Order Created Successfully');
        this.router.navigate(['/product/orders'])
      },
      (error) => {
        console.error('Error creating order:', error);
        // Handle error, e.g., show error message
      }
    );
  }

  handlePayment(response:any) {
    this.router.navigate(['/'])

    var data = {
      razorpay_payment_id:response.razorpay_payment_id,
      razorpay_order_id:response.razorpay_order_id,
      razorpay_signature:response.razorpay_signature
    }

    this.orderService.paymentVerify(data).subscribe(

      response=>{
        console.log(response,"verify payment")

      },(error=>{
        console.error('Error creating order:', error);
      })
    )

  }

  sendFailedPaymentData(data: any) {
    // Send payment failure data to the backend
    this.orderService.paymentVerify(data).subscribe(
      response => {
        console.log(response, "failed payment data sent to backend")
      },
      error => {
        console.error('Error sending failed payment data:', error);
      }
    );
  }

  deleteOrderById(id: any) {
    // Send payment failure data to the backend
    this.orderService.deleteOrder(id).subscribe(
      response => {
        console.log(response, "failed payment data sent to backend")
      },
      error => {
        console.error('Error sending failed payment data:', error);
      }
    );
  }

  removeCartItem(id: any,index:any) {
    if(!this.mainAuth.isLoggedIn()){
      this.cart.splice(index,1)
      sessionStorage.setItem('CartContents', JSON.stringify(this.cart));
      console.log(this.cart)
    } else {
      this.bucketService.removeCartItem(id).subscribe((res:any)=>{
        console.log(res)
        location.reload();
      })
    }
    this.calculateTotal()
    if (this.cart.length == 0){
      sessionStorage.removeItem('CartContents')
      this.router.navigate(['/choose/main'])
    }
  }

  calculateTotal() {
    // Calculate total price by summing up the prices of all items in the cart
    let cartData = this.cart.items || this.cart;
    console.log('cart data',this.cart)
    this.total = Number(cartData.reduce((acc: any, item: any) => acc + parseFloat(item.price), 0));
  }
}
