import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-billing-info',
  templateUrl: './sign-up-billing-info.component.html',
  styleUrls: ['./sign-up-billing-info.component.css']
})
export class SignUpBillingInfoComponent {
  isNewAddress:boolean=false
}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event:any) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()
