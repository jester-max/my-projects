import { Component } from '@angular/core';

@Component({
  selector: 'app-custome-dashboard',
  templateUrl: './custome-dashboard.component.html',
  styleUrls: ['./custome-dashboard.component.css']
})
export class CustomeDashboardComponent {

  ngOnInit():void{
  }
  checked(target: any) {
    if (target.checked){
      console.log(target.checked)
      // @ts-ignore
      document.getElementById('footer-link').classList.add('footer-link-checked')
    } else {
      console.log(target.checked)
      // @ts-ignore
      document.getElementById('footer-link').classList.remove('footer-link-checked')
    }


// Example starter JavaScript for disabling form submissions if there are invalid fields
    (() => {
      'use strict'
      console.log('hii')
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      const forms = document.querySelectorAll('.needs-validation')

      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          // @ts-ignore
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }

          form.classList.add('was-validated')
        }, false)
      })
    })()

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    // @ts-ignore
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

    const toastTrigger = document.getElementById('liveToastBtn')
    const toastLiveExample = document.getElementById('liveToast')

    if (toastTrigger) {
      // @ts-ignore
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
      toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
      })
    }
  }
}
