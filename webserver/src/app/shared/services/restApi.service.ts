import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RESTAPIService {

  constructor(private http: HttpClient) { }

  public post(url: string,body:any,options?:any):Observable<any> {
    return this.http.post(url, body,options);
  }

  public get(url: string,type?:any):Observable<any> {
    return this.http.get(url,type);
  }
  public put(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }

  public delete(url: string): Observable<any> {
    return this.http.delete(url);
  }

  public patch(url: string, body: any): Observable<any> {
    return this.http.patch(url, body);
  }
}
