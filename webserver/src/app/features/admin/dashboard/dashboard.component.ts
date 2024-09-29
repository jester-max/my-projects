import {Component, OnInit} from '@angular/core';
import {initFlowbite, initModals, initPopovers, initTabs, initTooltips} from "flowbite";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {userNotification} from "../../../shared/services/userNotification.service";
import {tap} from "rxjs/operators";
import * as util from 'zrender/lib/core/util';
import type { EChartsOption } from 'echarts';
import {HttpClient} from "@angular/common/http";
import {RESTAPIService} from "../../../shared/services/restApi.service";
import * as _ from 'lodash';
import {AdminDashboardService} from "./admin-dashboard-service";
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  options: Observable<EChartsOption>;
  user$! : Observable<any>;
  constructor(
    private router: Router,
    private restApi: RESTAPIService,
    private userNotificationService: userNotification,
    private adminDashboardService: AdminDashboardService
  ) {
    this.options = this.restApi.get('assets/flare.json', {responseType: 'json'}).pipe(
      map(data => {
        _.each(
          data.children,
          (datum: any, index: number) => index % 2 === 0 && (datum.collapsed = true)
        );
        return {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
          },
          series: [
            {
              type: 'tree',
              data: [data],
              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',
              symbolSize: 7,
              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right',
                fontSize: 9,
              },
              leaves: {
                label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left',
                },
              },
              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750,
            },
          ],
        };
      })
    );

  }
  ngOnInit() {

    initFlowbite();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();

    this.user$ = this.adminDashboardService.getUserBoxes();

    this.user$.subscribe((res: any) => {
      console.log(res);
    })
  }

}
