import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss']
})
export class CallToActionComponent {
  @HostListener('window:scroll', ['$event'])
  onScroll(event:any) {
    this.reveal();
  }
  reveal() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const revealPoint = 50;

    reveals.forEach((element) => {
      const revealTop = element.getBoundingClientRect().top;
      if (revealTop < windowHeight - revealPoint) {
        element.classList.add('opacity-100', 'translate-y-0');
      }
    });
  }
}
