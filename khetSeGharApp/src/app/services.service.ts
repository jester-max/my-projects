import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {ToastController} from "@ionic/angular";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  url=environment.url;

  constructor(private HTTP:HttpClient, private toastr : ToastController) {
  }


  findZone(pincode:string){
    return this.HTTP.get(`${this.url}check/deliveryAvailability/${pincode}`)
  }

  getBucketContent(boxType:string):Observable<any>{
    return this.HTTP.get(`${this.url}box-contents/data?boxType=${boxType}`);
  }

  getBoxSizeContent(boxType:string):Observable<any>{
    return this.HTTP.get(`${this.url}produce-boxes-size?boxType=${boxType}`);
  }

  postBox(items:any):Observable<any>{
    return this.HTTP.post(`${this.url}cart`,items);
  }

  updateBox(items:any):Observable<any>{
    return this.HTTP.put(`${this.url}cart`,items);
  }

  getBox():Observable<any>{
    return this.HTTP.get(`${this.url}cart`);
  }

  removeBox(id:any){
    return this.HTTP.delete(`${this.url}remove/cart/${id}`);
  }

  userAddress(addressDetails:any){
    console.log(addressDetails)
    return this.HTTP.put(`${this.url}user/update`,addressDetails)
  }

   getAddress():Observable<any>{
    return this.HTTP.get(`${this.url}user`);
  }

  postOder(orderDetails:any){
    return this.HTTP.post(`${this.url}create/order`,orderDetails);
  }

  getOder(){
    return this.HTTP.get(`${this.url}orders/user`);
  }

  getUserBox(id:string): Observable<any> {
    return this.HTTP.get<any>(`${this.url}user/boxes/${id}`);
  }

  getBoxItems(id: string) {
    return this.HTTP.get<any>(`${this.url}box/boxId/${id}`);
  }

  searchBoxItems(item:any):Observable<any>{
    return this.HTTP.get(`${this.url}search/content`,{params: {query:item}});
  }

  addItems(bid:any,item:any):Observable<any>{
    return this.HTTP.put(`${this.url}box/customise/${bid}`,item);
  }

  getCardItem(cartItemsID:any){
    return this.HTTP.get<any>(`${this.url}cart/item/${cartItemsID}`);
  }

  sendWelcome(token:any){
    return this.HTTP.post(`${this.url}send-welcome`,{token:token});
  }

  sendFCMToken(token:any){
    return this.HTTP.post(`${this.url}save/fcm-token`,{fcmToken:token});
  }


  async toastSuccess(message:any) {
    const alert = await this.toastr.create({
      message: ' ' + message,
      duration: 3000,
      cssClass:'custom-toast'

    });
    alert.present();
  }
}
