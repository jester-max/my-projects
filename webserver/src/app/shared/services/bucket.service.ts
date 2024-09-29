import { Injectable } from '@angular/core';
import { Observable} from "rxjs";
import {RESTAPIService} from "./restApi.service";
import {environment} from "../../core/constants/variables";

@Injectable({
  providedIn: 'root'
})
export class BucketService{

  constructor(private restApi : RESTAPIService) {}

  getBucketSizes(boxType:string):Observable<any>{
   return this.restApi.get(`${environment.apiUrl}produce-boxes-size?boxType=${boxType}`);
  }
  getBucketContent(boxType:string):Observable<any>{
    return this.restApi.get(`${environment.apiUrl}box-contents/data?boxType=${boxType}`);
  }
  getCart():Observable<any>{
    return this.restApi.get(`${environment.apiUrl}cart`);
  }
  setCart(cartItems:any):Observable<any>{
    return this.restApi.post(`${environment.apiUrl}cart`,cartItems)
  }
  removeCartItem(cartItems:any):Observable<any>{
    return this.restApi.delete(`${environment.apiUrl}remove/cart/${cartItems}`);
  }
  getCartItem(cartItemsID:any):Observable<any>{
    return this.restApi.get(`${environment.apiUrl}cart/item/${cartItemsID}`);
  }
  updateCartItem(cartItems:any):Observable<any>{
    return this.restApi.put(`${environment.apiUrl}update/cart/${cartItems.items._id}`,cartItems)
  }
}
