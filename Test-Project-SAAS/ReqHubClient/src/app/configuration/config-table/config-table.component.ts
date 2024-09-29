import { Component } from '@angular/core';

@Component({
  selector: 'app-config-table',
  templateUrl: './config-table.component.html',
  styleUrls: ['./config-table.component.css']
})
export class ConfigTableComponent {

  IsSearchActive:any='Search'
  SearchInput:any=''

  searchActive(event:any) {
    if (event.type==='focus'){
      // @ts-ignore
      document.getElementById('for-search').classList.add('search-active')
    } else {
      // @ts-ignore
      document.getElementById('for-search').classList.remove('search-active')
      this.IsSearchActive='Search'
      this.SearchInput=''
    }
  }

  ngOnInit():void{

  }
}
