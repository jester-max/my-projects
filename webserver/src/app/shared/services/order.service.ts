import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RESTAPIService} from "./restApi.service";
import {environment} from "../../core/constants/variables";

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private restApi : RESTAPIService) {}

  OrderCreate(orderDetails:any): Observable<any> {

    return this.restApi.post(`${environment.apiUrl}create/order`,orderDetails); // Here, we pass orderDetails as the request body

  }

  OrderGet(): Observable<any> {

    return this.restApi.get(`${environment.apiUrl}orders/user`); // Here, we pass orderDetails as the request body

  }

  paymentVerify(data:any):Observable<any>{

    let url="http://localhost:4000/v1/payment/verify"

    return this.restApi.post(url,data); // Here, we pass orderDetails as the request body

  }

  deleteOrder(id:any):Observable<any>{

    let url=`http://localhost:4000/v1/user/order/delete/${id}`

    return this.restApi.delete(url); // Here, we pass orderDetails as the request body

  }

  BoxesGet(orderId:any): Observable<any> {
    return this.restApi.get(`${environment.apiUrl}user/boxes/${orderId}`); // Here, we pass orderDetails as the request body
  }

  boxItemsUpdate(item:any,bid:any){
    return this.restApi.put(`${environment.apiUrl}box/customise/${bid}`,item); // Here, we pass orderDetails as the request body
  }

  searchBoxItems(item:any){
    return this.restApi.get(`${environment.apiUrl}search/content`,{params: {query:item}}); // Here, we pass orderDetails as the request body
  }

}
