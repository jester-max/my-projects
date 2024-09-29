import {Component, OnInit,HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'webserver';
  isChecheck : boolean = false

  unsavedChanges = false;

  // Listen for beforeunload event
  @HostListener('window:beforeunload', ['$event'])



  ngOnInit():void{
    window.addEventListener('beforeunload', (event) => {
      if (this.unsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // This line may not work in all browsers
      }
    });
    console.log('hiii')
  }


  // Call this method when changes are made
  markChangesAsUnsaved() {
    this.unsavedChanges = true;
  }

  // Call this method when changes are saved
  markChangesAsSaved() {
    this.unsavedChanges = false;
  }


  toggle(event:any){
    console.log(event.target.checked,'hiii')
    this.isChecheck = !!event.target.checked;
    return false
  }
}
