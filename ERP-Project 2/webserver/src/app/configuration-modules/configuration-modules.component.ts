import {Component, ElementRef, Renderer2} from '@angular/core';
import {ServiceService} from "../service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-configuration-modules',
  templateUrl: './configuration-modules.component.html',
  styleUrls: ['./configuration-modules.component.css']
})
export class ConfigurationModulesComponent {

  constructor(private service:ServiceService,
              private route:Router,
              private router:ActivatedRoute,
              private toast:NgToastService,
              private cookieService: CookieService,
              private renderer: Renderer2, private el: ElementRef,){}

  serviceData:any
  data:any
  selectedModules:any=[]
  allComplete: boolean = false;

  ngOnInit():void{
    this.data={
      moduleName:"",
      subModule:[]
    }
    // this.service.GetTenantServices(this.router.snapshot.params['_id']).subscribe((res:any)=>{
    //   console.log(res)
    // })
    this.service.GetTenantModules(this.router.snapshot.params['_id']).subscribe((res:any)=>{
      this.serviceData = res.data
      console.log(res)
    })
  }

  PostTenantModules(){
    this.serviceData[0].modules.push(this.data)
    console.log(this.serviceData)
    this.service.PostTenantModules(this.serviceData[0],this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res)
    })
  }

  SelectedModules(i:any,completed: any){
    console.log(this.serviceData[0].modules[i].subModule)
    this.selectedModules.push(this.serviceData[0].modules[i])
    this.allComplete = completed.checked;
    if (this.serviceData[0].modules[i].subModule == null) {
      return;
    }
    this.serviceData[0].modules[i].subModule.forEach((t: { completed: any; }) => (t.completed = completed.checked));
  }

  someComplete(i:any): boolean {
    if (this.serviceData[0].modules[i].subModule == null) {
      return false;
    }
    return this.serviceData[0].modules[i].subModule.filter((t: { completed: any; }) => t.completed).length > 0 && !this.allComplete;
  }

  updateSubModule(i:any) {
    this.allComplete = this.serviceData[0].modules[i].subModule != null && this.serviceData[0].modules[i].subModule.every((t: { completed: any; }) => t.completed);
  }

  submit(){
    this.service.UpdateTenantServiceStructure(this.serviceData[0],this.router.snapshot.params['_id']).subscribe((res:any)=>{
      console.log(res)
      this.route.navigate(['mainModules',this.router.snapshot.params['_id']])
    })
  }
}
