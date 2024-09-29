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
import {CookieService} from "ngx-cookie-service";
@Injectable({
  providedIn: 'root'
})

export class ServiceService implements HttpInterceptor{

  url=`http://localhost:9090/`

  constructor(private http:HttpClient,private toast:NgToastService,private cookie: CookieService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = this.cookie.get('accessToken')

    let jwttoken = req.clone({
      setHeaders: {
        Authorization:`Bearer ${token}`,
      }
    })
    return next.handle(jwttoken)
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return next.handle(req.clone()).pipe(map((event: HttpEvent<any>) => {
  //     if (event instanceof HttpResponse) {
  //       // statusfunction(event.body)
  //       // if (event.body.Status === "SUCCESS"){
  //       //   this.toast.success({detail:event.body.Status,summary:'Your Account is Successfully Created'})
  //       //   // this.router.navigate(['main/',res.data.tenantID])
  //       // } else if (event.body.Status === "SUCCESS"){
  //       //   this.toast.success({detail:event.body.Status,summary:'Your Dashboard is Successfully Created'})
  //       //   // this.router.navigate(['landing-page/',res.data.tenantID])
  //       // } else {
  //       //   this.toast.error({detail:'ERROR',summary:event.body.Status})
  //       // }
  //     }
  //     return event;
  //   }))
  // }

  // common validation

  validatCommon(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/validate/custom/fields/${id}`,data)
  }

  addTenant(data:any){
    return this.http.post(`${this.url}tenant`, data)
  }

  GetTenantModules(id:any){
    return this.http.get(`${this.url}tenant-manager/services`)
  }

  PostTenantModules(data:any,id:any){
    return this.http.put(`${this.url}tenant-user/services/structure/${id}`,data)
  }

  GetTenantServiceStructure(id:any){
    return this.http.get(`${this.url}tenant-user/services/structure/${id}`)
  }

  UpdateTenantServiceStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant-user/services/structure/${id}`,data)
  }

  //


  getInvoice(){
    // let url=`http://192.168.59.54:9090/default/admin/invoice`
    return this.http.get(`${this.url}default/module-structure`)
  }

  postSaleInvoiceStructure(data:any,id:any){
    // let url=`http://192.168.59.54:9090/add-invoice/test/${id}`
    return this.http.post(`${this.url}tenant-user/sale/sale_invoice/create-invoice/structure/${id}`,data)
  }

  getSaleInvoiceStructure(id:any){
    // let url=`http://192.168.59.54:9090/get-invoice/test/${id}`
    return this.http.get(`${this.url}tenant-user/sale/sale_invoice/get-invoice/structure/${id}`)
  }

  postInvoiceAdmin(data:any,id:any){
    // let url=`http://192.168.59.54:9090/tenant/create-invoice/${id}`
    return this.http.post(`${this.url}tenant-user/sale/sale_invoice/create-invoice/${id}`,data)
  }

  deleteAllInvoice(id:any){
    return this.http.delete(`${this.url}tenant-user/sale/sale_invoice/delete-invoice/${id}`)
  }

  deleteOneInvoice(deleteId:any,id:any){
    return this.http.delete(`${this.url}tenant-user/sale/sale_invoice/delete-invoice/one/${id}?id=${deleteId}`)
  }

  update(updateId:any,id:any){
    return this.http.get(`${this.url}tenant-user/sale/sale_invoice/delete-invoice/one/${id}?id=${updateId}`)
  }

  // getSaleInvoice(id:any){
  //   // let url=`http://192.168.59.54:9090/tenant/get-invoice/${id}`
  //   return this.http.get(`${this.url}tenant/sale/sale_invoice/get-invoice/${id}`)
  // }

  getSaleInvoice(size:any,number:any,search:any,id:any){
    // let url=`http://192.168.59.54:9090/tenant/get-invoice/${id}`
    return this.http.get<any>(`${this.url}tenant-user/sale/sale_invoice/get-invoice/${id}`,{params:{size: size,number: number,search:search}})
  }

  getOneSaleInvoice(id:any,tokenId:any){
    return this.http.get(`${this.url}tenant-user/sale/sale_invoice/get-invoice/one/test/${tokenId}`,{params:{id: id}})
  }

  updateSaleInvoice(data:any,tokenId:any,id:any){
    return this.http.put(`${this.url}tenant-user/sale/sale_invoice/update-invoice/${tokenId}`,data,{params:{id: id}})
  }

  updateSaleInvoiceStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant-user/sale/update-invoice/structure/${id}`,data)
  }

//  sale quatation
  getSaleQuatationStructure(id:any){
    return this.http.get(`${this.url}tenant-user/sale/sale_quotation/get-quotation/structure/${id}`)
  }

  postSaleQuatationStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/sale/sale_quotation/create-quotation/structure/${id}`,data)
  }

  getSaleQuatation(id:any){
    return this.http.get(`${this.url}tenant-user/sale/get-quotation/${id}`)
  }

  postSaleQuatation(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/sale/create-quotation/${id}`,data)
  }

  updateSaleQuotationStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant-user/sale/update-quotation/structure/${id}`,data)
  }

  //  Transport
  postSaleTransportStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/sale/sale_transport/create-transport/structure/${id}`,data)
  }

  getSaleTransportStructure(id:any){
    return this.http.get(`${this.url}tenant-user/sale/sale_transport/get-transport/structure/${id}`)
  }

  postSaleTransport(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/sale/create-transport/${id}`,data)
  }

  getSaleTransport(id:any){
    return this.http.get(`${this.url}tenant-user/sale/get-transport/${id}`)
  }

  updateSaleTransportStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant-user/sale/update-transport/structure/${id}`,data)
  }

  //  purchase quatation
  getpurchaseQuatationStructure(id:any){
    return this.http.get(`${this.url}tenant-user/purchase/purchase_quotation/get-quotation/structure/${id}`)
  }

  postPurchaseQuatationStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/purchase/create-quotation/structure/${id}`,data)
  }

  getPurchaseQuatation(id:any){
    return this.http.get(`${this.url}tenant-user/purchase/get-quotation/${id}`)
  }

  postPurchaseQuatation(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/purchase/create-quotation/${id}`,data)
  }

  updatePurchaseQuatationStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant-user/purchase/update-quotation/structure/${id}`,data)
  }

  //  purchase invoice
  getPurchaseInvoiceStructure(id:any){
    return this.http.get(`${this.url}tenant-user/purchase/invoice/get-invoice/structure/${id}`)
  }

  postPurchaseInvoiceStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/purchase/create-invoice/structure/${id}`,data)
  }

  postPurchaseInvoice(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/purchase/create-invoice/${id}`,data)
  }

  getPurchaseInvoice(id:any){
    return this.http.get(`${this.url}tenant-user/purchase/get-invoice/${id}`)
  }

  updatePurchaseInvoiceStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant-user/purchase/update-invoice/structure/${id}`,data)
  }

  // customer
  getCustomerStructure(id:any){
    return this.http.get(`${this.url}tenant-user/customer/customer/get-customer/structure/${id}`)
  }

  postCustomerStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/customer/customer/create-customer/structure/${id}`,data)
  }

  postCustomer(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/customer/customer/create-customer/${id}`,data)
  }

  getCustomer(id:any){
    return this.http.get(`${this.url}tenant-user/customer/customer/get-customer/${id}`)
  }

  updateCustomerStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant-user/customer/update-customer/structure/${id}`,data)
  }

  //  employee
  getEmployeeStructure(id:any){
    return this.http.get(`${this.url}tenant-user/employee/employee/get-employee/structure/${id}`)
  }

  postEmployeeStructure(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/employee/employee/create-employee/structure/${id}`,data)
  }

  getEmployee(id:any){
    return this.http.get(`${this.url}tenant-user/employee/get-employee/${id}`)
  }

  postEmployee(data:any,id:any){
    return this.http.post(`${this.url}tenant-user/employee/create-employee/${id}`,data)
  }

  updateEmployeeStructure(data:any,id:any){
    return this.http.put(`${this.url}tenant-user/employee/update-employee/structure/${id}`,data)
  }

//  complete config
  updateConfig(data:any,id:any){
    return this.http.put(`${this.url}tenant-user/${id}`,data)
  }

}
