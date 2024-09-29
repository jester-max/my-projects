import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse, HttpSentEvent
} from "@angular/common/http";
import {NgToastService} from "ng-angular-popup";
import {Observable, throwError} from "rxjs";
import {retry, catchError, map} from "rxjs/operators";
import {statusfunction} from "../app/status";
import {ActivatedRoute} from "@angular/router";
@Injectable({
  providedIn: 'root'
})

export class ServiceService implements HttpInterceptor{

  url=`http://localhost:9090/`

  // intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
  //   // @ts-ignore
  //   return next.handle(request).pipe(retry(1),catchError((error: HttpErrorResponse)=>{
  //     console.log(error.error)
  //   }))
  // }

  constructor(private http:HttpClient,private toast:NgToastService,private router:ActivatedRoute) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone()).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // statusfunction(event.body)
        // if (event.body.Status === "SUCCESS"){
        //   this.toast.success({detail:event.body.Status,summary:'Your Account is Successfully Created'})
        //   // this.router.navigate(['main/',res.data.tenantID])
        // } else if (event.body.Status === "SUCCESS"){
        //   this.toast.success({detail:event.body.Status,summary:'Your Dashboard is Successfully Created'})
        //   // this.router.navigate(['landing-page/',res.data.tenantID])
        // } else {
        //   this.toast.error({detail:'ERROR',summary:event.body.Status})
        // }
      }
      return event;
    }))
  }

  addTenant(data:any){
    return this.http.post(`${this.url}tenant`, data)
  }

  getInvoice(){
    // let url=`http://192.168.59.54:9090/default/admin/invoice`
    return this.http.get(`${this.url}default/module-structure`)
  }

  postSaleInvoiceStructure(data:any,id:any){
    // let url=`http://192.168.59.54:9090/add-invoice/test/${id}`
    return this.http.post(`${this.url}tenant/sale/create-invoice/structure/${id}`,data)
  }

  getSaleInvoiceStructure(id:any){
    // let url=`http://192.168.59.54:9090/get-invoice/test/${id}`
    return this.http.get(`${this.url}tenant/sale/get-invoice/structure/${id}`)
  }

  postInvoiceAdmin(data:any,id:any){
    // let url=`http://192.168.59.54:9090/tenant/create-invoice/${id}`
    return this.http.post(`${this.url}tenant/sale/create-invoice/${id}`,data)
  }

  getSaleInvoice(id:any){
    // let url=`http://192.168.59.54:9090/tenant/get-invoice/${id}`
    return this.http.get(`${this.url}tenant/sale/get-invoice/${id}`)
  }

  updateSaleInvoiceStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant/sale/update-invoice/structure/${id}`,data)
  }

//  sale quatation
  getSaleQuatationStructure(id:any){
    return this.http.get(`${this.url}tenant/sale/get-quotation/structure/${id}`)
  }

  postSaleQuatationStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant/sale/create-quotation/structure/${id}`,data)
  }

  getSaleQuatation(id:any){
    return this.http.get(`${this.url}tenant/sale/get-quotation/${id}`)
  }

  postSaleQuatation(data:any,id:any){
    return this.http.post(`${this.url}tenant/sale/create-quotation/${id}`,data)
  }

  updateSaleQuotationStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant/sale/update-quotation/structure/${id}`,data)
  }

  //  Transport
  postSaleTransportStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant/sale/create-transport/structure/${id}`,data)
  }

  getSaleTransportStructure(id:any){
    return this.http.get(`${this.url}tenant/sale/get-transport/structure/${id}`)
  }

  postSaleTransport(data:any,id:any){
    return this.http.post(`${this.url}tenant/sale/create-transport/${id}`,data)
  }

  getSaleTransport(id:any){
    return this.http.get(`${this.url}tenant/sale/get-transport/${id}`)
  }

  updateSaleTransportStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant/sale/update-transport/structure/${id}`,data)
  }

  //  purchase quatation
  getpurchaseQuatationStructure(id:any){
    return this.http.get(`${this.url}tenant/purchase/get-quotation/structure/${id}`)
  }

  postPurchaseQuatationStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant/purchase/create-quotation/structure/${id}`,data)
  }

  getPurchaseQuatation(id:any){
    return this.http.get(`${this.url}tenant/purchase/get-quotation/${id}`)
  }

  postPurchaseQuatation(data:any,id:any){
    return this.http.post(`${this.url}tenant/purchase/create-quotation/${id}`,data)
  }

  updatePurchaseQuatationStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant/purchase/update-quotation/structure/${id}`,data)
  }

  //  purchase invoice
  getPurchaseInvoiceStructure(id:any){
    return this.http.get(`${this.url}tenant/purchase/get-invoice/structure/${id}`)
  }

  postPurchaseInvoiceStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant/purchase/create-invoice/structure/${id}`,data)
  }

  postPurchaseInvoice(data:any,id:any){
    return this.http.post(`${this.url}tenant/purchase/create-invoice/${id}`,data)
  }

  getPurchaseInvoice(id:any){
    return this.http.get(`${this.url}tenant/purchase/get-invoice/${id}`)
  }

  updatePurchaseInvoiceStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant/purchase/update-invoice/structure/${id}`,data)
  }

  // customer
  getCustomerStructure(id:any){
    return this.http.get(`${this.url}tenant/customer/get-customer/structure/${id}`)
  }

  postCustomerStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant/customer/create-customer/structure/${id}`,data)
  }

  postCustomer(data:any,id:any){
    return this.http.post(`${this.url}tenant/customer/create-customer/${id}`,data)
  }

  getCustomer(id:any){
    return this.http.get(`${this.url}tenant/customer/get-customer/${id}`)
  }

  updateCustomerStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant/customer/update-customer/structure/${id}`,data)
  }

  //  employee
  getEmployeeStructure(id:any){
    return this.http.get(`${this.url}tenant/employee/get-employee/structure/${id}`)
  }

  postEmployeeStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant/employee/create-employee/structure/${id}`,data)
  }

  getEmployee(id:any){
    return this.http.get(`${this.url}tenant/employee/get-employee/${id}`)
  }

  postEmployee(data:any,id:any){
    return this.http.post(`${this.url}tenant/employee/create-employee/${id}`,data)
  }

  updateEmployeeStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant/employee/update-employee/structure/${id}`,data)
  }

//  complete config
  updateConfig(data:any,id:any){
    return this.http.put(`${this.url}tenant/${id}`,data)
  }

}
