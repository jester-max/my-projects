import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StructureService{

  url=`http://localhost:9090/`

  constructor(private http:HttpClient,
              private cookie: CookieService) {}

  GetTenantServiceStructure(id:any){
    return this.http.get(`${this.url}tenant-user/services/structure/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50TmFtZSI6ImFua2l0IiwiZW1haWwiOiJhbmtpdEBoYXJpcHJpeWFncnAuY29tIiwiaWF0IjoxNzE4NjA2MDg5LCJleHAiOjE3MTg2OTI0ODl9.RndILsrWIuf5lxnkD2kIUhwSqOiA3un6FKr3XEEN_fg`)
  }

  getSaleInvoiceStructure(id:any){
    return this.http.get(`${this.url}tenant-user/sale/sale_invoice/get-invoice/structure/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50TmFtZSI6ImFua2l0IiwiZW1haWwiOiJhbmtpdEBoYXJpcHJpeWFncnAuY29tIiwiaWF0IjoxNzE4NjA2MDg5LCJleHAiOjE3MTg2OTI0ODl9.RndILsrWIuf5lxnkD2kIUhwSqOiA3un6FKr3XEEN_fg`)
  }

  getSaleInvoice(size:any,number:any,search:any,id:any){
    return this.http.get<any>(`${this.url}tenant-user/sale/sale_invoice/get-invoice/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50TmFtZSI6ImFua2l0IiwiZW1haWwiOiJhbmtpdEBoYXJpcHJpeWFncnAuY29tIiwiaWF0IjoxNzE4NjA2MDg5LCJleHAiOjE3MTg2OTI0ODl9.RndILsrWIuf5lxnkD2kIUhwSqOiA3un6FKr3XEEN_fg`,{params:{size: size,number: number,search:search}})
  }

  postInvoiceAdmin(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/sale/sale_invoice/create-invoice/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50TmFtZSI6ImFua2l0IiwiZW1haWwiOiJhbmtpdEBoYXJpcHJpeWFncnAuY29tIiwiaWF0IjoxNzE4NjA2MDg5LCJleHAiOjE3MTg2OTI0ODl9.RndILsrWIuf5lxnkD2kIUhwSqOiA3un6FKr3XEEN_fg`,data)
  }
}
