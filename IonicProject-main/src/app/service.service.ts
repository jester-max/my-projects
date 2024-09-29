import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient,private toastr : ToastController) {}

 header:any = new HttpHeaders({
    'Content-type':'application/json'
  })

  url:any = 'http://192.168.76.196:3001'

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let jwtToken = localStorage.getItem('jwt-token')
    let csrfToken = localStorage.getItem('csrf-token')
    let noticationToken = localStorage.getItem('noticationToken')

    let jwttoken = req.clone({
      setHeaders: {
        jwt_token : `${jwtToken}`,
        csrf_Token : `${csrfToken}`,
        notication_Token : `${noticationToken}`
      }
    })
    return next.handle(jwttoken)
  }

  _refreshNeeded$ = new Subject<void>();

   refreshNeeded(){
    return this._refreshNeeded$
   }

  async toastSuccess(res:any) {
    const alert = await this.toastr.create({
      message: res.message,
      duration: 3000,
      cssClass:res.status,
      icon:'alert-circle-outline',
    });
    alert.present();
  }


  scanResult(barcodeNumber:any){
    console.log(barcodeNumber)
    return this.http.get(`${this.url}/v1/checkbarcodenumber/${barcodeNumber}`)
  }

  login(loginInfo:any){
    console.log(loginInfo)
    return this.http.post(`${this.url}/v1/user/login/ionic`,loginInfo)
      .pipe(tap(()=>{
        this._refreshNeeded$.next();
      }))
  }

  issue(issueData:any){
    console.log(issueData)
    return this.http.post(`${this.url}/v1/verify/request/issuedata`,issueData)
  }

  verifyIssue(page:any,size:any){
    console.log(size,page)
    return this.http.get(`${this.url}/v1/verify/issuedata/${page}/${size}`)
  }

  verifyingIssue(verifyingIssueData:any){
    console.log(verifyingIssueData)
    return this.http.post(`${this.url}/v1/verified/issuedata`,verifyingIssueData)
  }

  register(register:any){
    console.log(register)
    return this.http.post(`${this.url}/v1/register`,register)
  }

  test(test:any){
    return this.http.post(`${this.url}/v1/register`,test)
  }

  waste(waste:any){
    return this.http.post(`${this.url}/v1/waste`,waste)
  }


  //  common for inventory value api
  InventoryValueStock(){
    return this.http.get(`${this.url}/v1/chart/goods/inout`)
  }

  InventoryDailyUsesgoods(data:any){
    return this.http.get(`${this.url}/v1/dailyissuegoods`,{params:{fromDate:data.fromDate, toDate:data.toDate}})
  }

  //  common for all stock api
  AllStock(){
    return this.http.get(`${this.url}/v1/check/all/status`)
      .pipe(tap(()=>{
        this._refreshNeeded$.next();
      }))
  }

  //  login user get api
  LoginUser(){
    return this.http.get(`${this.url}/v1/getionic/user`)
  }

  //  forgot user get api
  SendMail(email:any){
    console.log(email)
    return this.http.post(`${this.url}/v1/sendotp`, {email})
  }

  SendVerifyToken(token:any){
    console.log(token)
    return this.http.post(`${this.url}/v1/checkotp`, {token})
  }

  createPassword(password:any){
    console.log(password)
    return this.http.post(`${this.url}/v1/change/password`, password)
  }

  //  scan item api
  ScanProduct(itemid:any){
    // return this.http.get(`${this.url}/v1/check/barcode/product/${itemid}`)
    return this.http.get(`${this.url}/v1/check/barcode/productstock/${itemid}`)
  }

  //  scan machine api
  ScanMachine(itemid:any){
    return this.http.get(`${this.url}/v1/check/barcode/machine/${itemid}`)
  }

  //  notifications
  SendToken(token:any){
    return this.http.get(`${this.url}/send-fcm/${token}`)
  }

  //  vendor
  GetVendor(){
    return this.http.get(`${this.url}/v1/vender/1/1000`)
  }

  //  employee
  GetEmployee(){
    return this.http.get(`${this.url}/v1/employee/1/1000`)
  }

  //  customer
  GetCustomer(){
    return this.http.get(`${this.url}/v1/customer/1/1000`)
  }

  //  chats
  GetInventoryChart(){
    return this.http.get(`${this.url}/v1/circle/chart`)
  }

  //  purchase
  //  get purchase item api
  GetItem(perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/addproduct/pagination/product/${perPage}/${pageSize}`)
  }

  //  find one purchase item api
  GetOneItem(itemid:any){
    return this.http.get(`${this.url}/v1/findproductid/${itemid}`)
  }

  //  scan purchase item api
  ScanItem(itemid:any){
    return this.http.get(`${this.url}/v1/check/barcode/product/${itemid}`)
  }

  //  add item to inventory api
  CreateItem(item:any){
    return this.http.post(`${this.url}/v1/addproduct`,item)
  }

  //  reject item to inventory api
  RejectItem(reason:any){
    return this.http.put(`${this.url}/v1/addproduct/update/status`,reason)
  }

  //  search purchase item api
  SearchItem(searchText:any,perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/addproduct/${searchText}/${perPage}/${pageSize}`)
  }

  //  faulty purchase item api
  FaultyItem(purchaseData:any){
    return this.http.post(`${this.url}/v1/faulty/product`,purchaseData)
  }

  //  status purchase item api
  StatusItem(){
    return this.http.get(`${this.url}/v1/addproduct/verify/status`)
  }

  //  date filter purchase item api
  DateFilterItem(fromDate:any,toDate:any){
    return this.http.get(`${this.url}/v1/product/search/with/date/${fromDate}/${toDate}`)
  }



  //  issue
  //  get issue item api
  GetIssue(perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/issueproduct/${perPage}/${pageSize}`)
  }

  //  find one issue item api
  GetOneIssue(itemid:any){
    return this.http.get(`${this.url}/v1/issue/${itemid}`)
  }

  //  scan issue item api
  ScanIssue(itemid:any){
    // return this.http.get(`${this.url}/v1/check/barcode/product/${itemid}`)
    return this.http.get(`${this.url}/v1/check/barcode/productstock/${itemid}`)
  }

  //  add issue item to inventory api
  CreateIssue(item:any){
    return this.http.post(`${this.url}/v1/issue`,item)
  }

  //  reject issue to inventory api
  RejectIssue(reason:any){
    return this.http.put(`${this.url}/v1/issue/update/status`,reason)
  }

  //  search issue item api
  SearchIssue(searchText:any,perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/issue/${searchText}/${perPage}/${pageSize}`)
  }

  //  faulty issue item api
  FaultyIssue(purchaseData:any){
    return this.http.post(`${this.url}/v1/faulty/product`,purchaseData)
  }

  //  status issue item api
  StatusIssue(){
    return this.http.get(`${this.url}/v1/issue/verify/status`)
  }

  //  date filter issue api
  DateFilterIssue(fromDate:any,toDate:any){
    return this.http.get(`${this.url}/v1/issue/search/with/date/${fromDate}/${toDate}`)
  }



  //  time
  //  get time api
  GetTime(perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/time/log/${perPage}/${pageSize}`)
  }

  //  find one time api // not in use
  GetOneTime(itemid:any){
    return this.http.get(`${this.url}/v1/time/log/${itemid}`)
  }

  //  add time to inventory api
  CreateTime(item:any){
    return this.http.post(`${this.url}/v1/time/log`,item)
  }

  //  reject time to inventory api
  RejectTime(reason:any){
    return this.http.put(`${this.url}/v1/time/log/update/status`,reason)
  }

  //  search time item api
  SearchTime(searchText:any,perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/time/log/${searchText}/${perPage}/${pageSize}`)
  }

  //  status time item api
  StatusTime(){
    return this.http.get(`${this.url}/v1/time/verify/status`)
  }

  //  date filter purchase item api
  DateFilterTime(fromDate:any,toDate:any){
    return this.http.get(`${this.url}/v1/time/search/with/date/${fromDate}/${toDate}`)
  }




  //  waste
  //  get waste item api
  GetWaste(perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/waste/log/${perPage}/${pageSize}`)
  }

  //  scan waste item api
  ScanWasteItem(itemid:any){
    return this.http.get(`${this.url}/v1/check/barcode/addproduct/${itemid}`)
  }

  //  add waste item to inventory api
  CreateWaste(item:any){
    return this.http.post(`${this.url}/v1/waste/log`,item)
  }

  //  reject waste item to inventory api
  RejectWaste(reason:any){
    return this.http.put(`${this.url}/v1/waste/log/update/status`,reason)
  }

  //  search waste item api
  SearchWaste(searchText:any,perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/waste/log/${searchText}/${perPage}/${pageSize}`)
  }

  //  status waste item api
  StatusWaste(){
    return this.http.get(`${this.url}/v1/wasted/logverify/status`)
  }

//  date filter waste api
  DateFilterWaste(fromDate:any,toDate:any){
    return this.http.get(`${this.url}/v1/waste/search/with/date/${fromDate}/${toDate}`)
  }



  //  mistake
  //  get mistake item api
  GetMistake(perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/mistake/${perPage}/${pageSize}`)
  }

  //  find one mistake item api // not in use
  GetOneMistake(itemid:any){
    return this.http.get(`${this.url}/v1/findproductid/${itemid}`)
  }

  //  add mistake item to inventory api
  CreateMistake(item:any){
    return this.http.post(`${this.url}/v1/mistake`,item)
  }

  //  reject mistake item to inventory api
  RejectMistake(reason:any){
    return this.http.put(`${this.url}/v1/mistake/update/status`,reason)
  }

  //  search mistake item api
  SearchMistake(searchText:any,perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/mistake/${searchText}/${perPage}/${pageSize}`)
  }

  //  status mistake item api
  StatusMistake(){
    return this.http.get(`${this.url}/v1/mistakeverify/status`)
  }

  //  scan mistake item api
  ScanMistake(itemid:any){
    return this.http.get(`${this.url}/v1/check/barcode/addproduct/${itemid}`)
  }

  //  date filter mistake api
  DateFilterMistake(fromDate:any,toDate:any){
    return this.http.get(`${this.url}/v1/mistake/search/with/date/${fromDate}/${toDate}`)
  }

  //  inventory
  //  get materials item api
  GetMaterialItem(perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/itemstock/${perPage}/${pageSize}`)
  }

  //  search materials item api
  SearchMaterialItem(searchText:any,perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/stock/${searchText}/${perPage}/${pageSize}`)
  }

  //  get tools item api
  GetToolsItem(perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/toolstock/pagination/${perPage}/${pageSize}`)
  }

  //  search tools item api
  SearchToolsItem(searchText:any,perPage:any,pageSize:any){
    return this.http.get(`${this.url}/v1/stock/${searchText}/${perPage}/${pageSize}`)
  }


  // customer account

  findAllCustomerAccount(page:any,size:any){
    return this.http.get(`${this.url}/v1/account/entry/${page}/${size}`)
  }

  findCustomerReport(page:any,size:any){
    return this.http.get(`${this.url}/v1/sale/report/${page}/${size}`)
  }

  findCustomerAccount(searchStr:string,page:any,size:any){
    return this.http.get(`${this.url}/v1/account/entry/${searchStr}/${page}/${size}`)
  }

  searchCustomerAccount(searchStr:string,page:any,size:any){
    return this.http.get(`${this.url}/v1/accountsearchwithpagination/${searchStr}/${page}/${size}`)
  }

  // vendor account
  findAllVendorsAccount(page:any,size:any){
    return this.http.get(`${this.url}/v1/purchase/account/entry/${page}/${size}`)
  }

  findVendorReport(page:any,size:any){
    return this.http.get(`${this.url}/v1/purchasereport/${page}/${size}`)
  }

  findVendorAccount(searchStr:string,page:any,size:any){
    return this.http.get(`${this.url}/v1/purchase/account/entry/${searchStr}/${page}/${size}`)
  }

  searchVendorAccount(searchStr:string,page:any,size:any){
    return this.http.get(`${this.url}/v1/accountsearchwithpaginationpurchase/${searchStr}/${page}/${size}`)
  }

}
