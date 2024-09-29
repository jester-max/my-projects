import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})
export class StotageServiceService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public setItem(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async getItem(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  public removeItem(key: string) {
    this._storage?.remove(key);
  }

  public remove(key:string){
    return  this._storage?.remove(key);
  }
  public get(key:string){
    return this._storage?.get(key);
  }

  public clear() {
    this._storage?.clear();
  }
}
