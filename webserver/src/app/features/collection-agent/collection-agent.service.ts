import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../core/constants/variables";
import {Observable} from "rxjs";
import {jwtDecode} from "jwt-decode";
import { io, Socket } from 'socket.io-client'; // Import Socket.IO client

@Injectable({
  providedIn: 'root'
})
export class CollectionAgentService {
  socket:any
  constructor(private Http:HttpClient) {
   // this.socket = io(environment.apiUrl);
  }


  registrationAgent(formData:any) {
    let url=`${environment.apiUrl}collection/agent`
    return this.Http.post<any>(url, formData);
  }

  LoginCollectionAgent(email: string, password: string):Observable<any> {
    let url=`${environment.apiUrl}login/collection/agent`
    return this.Http.post<any>(url, {email,password});

  }

  getAgentProfile():Observable<any> {
    let url=`${environment.apiUrl}collection/agent/profile`
    return this.Http.get<any>(url);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000; // current time in seconds
      return decoded.exp < now;
    } catch (error) {
      console.log("Token decode failed:", error);
      return true; // consider the token expired if any error occurs
    }
  }

  getCollectionCenterTotal(): Observable<any> {
    let url=`${environment.apiUrl}collection-centers`
    return this.Http.get<any[]>(url)

  }

  distributionCenterTotal(): Observable<any> {
    let url=`${environment.apiUrl}distribution-centers`
    return this.Http.get<any[]>(url)

  }

  getFarmerProcessData(): Observable<any> {
    let url=`${environment.apiUrl}process/farmer/product`
    return this.Http.get<any[]>(url)

  }

  updateFarmerProcessData(id:any,data:any): Observable<any> {

    let url=`${environment.apiUrl}update/farmer/product/${id}`
    return this.Http.put<any[]>(url,data)

  }

}
