import {Injectable} from "@angular/core";
import {RESTAPIService} from "../../../shared/services/restApi.service";
import {environment} from "../../../core/constants/variables";
import {manager} from "../../../core/constants/profileManager";
import {BehaviorSubject, Observable} from "rxjs";
import {IResponse} from "../../../shared/interfaces/response.interface";
import {IAdminUser} from "../../../shared/interfaces/admin-user.interface";
import {catchError, tap} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AdminDashboardService {
  private adminDetailsSubject = new BehaviorSubject<IResponse<IAdminUser>>({
    status: '',
    language: '',
    data: {
      firstName: '',
      lastName: '',
      workEmail: '',
      imageUrl: '',
      online: '',
      contact: '',
      role: '',
      address: {
        city:'',
        zipCode:'',
        region:'',
        state:'',
        village:'',
        streetAddress:'',
        district:'',
      }
    }
  });
  public adminDetails$: Observable<IResponse<IAdminUser>> = this.adminDetailsSubject.asObservable();


  constructor(private restApiService: RESTAPIService) {
    this.adminData();
  }

  adminData(){
    return this.restApiService.get(`${environment.apiUrl}admin`).pipe((
      tap((data:IResponse<IAdminUser>) => this.adminDetailsSubject.next(data))
    ),catchError(err => {console.log('error while fetching admin details',err); throw new Error(err)}));
  }


  updateAdmin(data:IAdminUser){
    return this.restApiService.put(`${environment.apiUrl}admin`,data).pipe(
      tap((res:IResponse<IAdminUser>) => this.adminDetailsSubject.next(res))
    )
  }

  getUsers(isCount: boolean, pageNumber: number , size: number){
    return this.restApiService.get(`${environment.apiUrl}users?pageNumber=${pageNumber}&size=${size}&isCount=${isCount}`)
  }

  getProduct(){
    return this.restApiService.get(`${environment.apiUrl}get/farmerProduct/admin`)
  }

  postRequestingProduct(requestData:any){
    return this.restApiService.post(`${environment.apiUrl}purchase/request/admin`,requestData)
  }

  getRequestingProduct():Observable<any>{
    return this.restApiService.get(`${environment.apiUrl}get/purchase/request/admin`)
  }

  postBuyRequest(requestData:any){
    return this.restApiService.post(`${environment.apiUrl}buy/product/admin`,requestData)
  }

  getPurchase(){
    return this.restApiService.get(`${environment.apiUrl}get/purchase/farmerProduct/admin`)
  }

  addMarketPurchase(purchaseDetails:any){
    return this.restApiService.post(`${environment.apiUrl}purchase/farmerProduct/admin`,purchaseDetails)
  }

  getUserBoxes(){
    return this.restApiService.get(`${environment.apiUrl}all/users/box`)
  }



  postDistributeItem(productId:any){
    return this.restApiService.post(`${environment.apiUrl}distribute/product/${productId}`,'')
  }
}
