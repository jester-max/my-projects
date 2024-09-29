import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {Router} from "@angular/router";
import {CollectionAgentService} from "../../collection-agent.service";

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.scss'],

})
export class AgentHomeComponent {


  displayedColumns: string[] = ['serialNumber','centerName', 'zipCode', 'location', 'contactPerson', 'contactNumber'];
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  showCollectionTable: boolean = false;
  collectionCenterData: any[] = []
  collCenterTotal: any;

  distributionTotal:any
  showDistributionTable: boolean = false;
  distributionCenterData: any[] = [];




  constructor(private router:Router ,private agentService:CollectionAgentService ) {}


  ngOnInit(): void {

    // Call a method to fetch data from a service
    this.GetCollectionCenters()
    this.GetDistributionCenters()

  }


  GetCollectionCenters() {
    this.agentService.getCollectionCenterTotal().subscribe((res: any) => {
      if (res && res.data && res.data.length) {
        this.collectionCenterData = res.data;
        this.collCenterTotal = res.data.length;
      } else {
        this.collCenterTotal = 0;
      }
    },error => {
      this.collCenterTotal = 0;
    })
  }


  GetDistributionCenters(){

    this.agentService.distributionCenterTotal().subscribe((res: any) => {

      if (res && res.data && res.data.length) {
        this.distributionCenterData = res.data;
        this.distributionTotal = res.data.length;

      } else {
        this.distributionTotal = 0;
      }
    },error => {
      this.distributionTotal = 0;
    })
  }


  toggleCollectionTable() {
    this.showCollectionTable = !this.showCollectionTable;
    if (this.showCollectionTable) {
      this.showDistributionTable = false; // Hide distribution table when collection table is shown
    }
  }


  toggleDistributionTable() {
    this.showDistributionTable = !this.showDistributionTable;
    if (this.showDistributionTable) {
      this.showCollectionTable = false; // Hide collection table when distribution table is shown
    }
  }

  onScroll() {
    const scrollPosition = this.scrollContainer.nativeElement.scrollTop;
    console.log('Scroll Position:', scrollPosition);
  }
}


