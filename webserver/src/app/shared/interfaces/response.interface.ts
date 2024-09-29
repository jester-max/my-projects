export interface IResponse<T>{
  status:string,
  language:string,
  data:T ;  // generic type T for the data property
}
