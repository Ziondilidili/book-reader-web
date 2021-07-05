import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdbService {
  private idb?:IDBDatabase
  private IDBFactory:IDBFactory = indexedDB
  constructor() { }

  async openIDB(dbName:string,version?:number):Promise<IDBDatabase>{
    const _this = this
    if(!!_this.idb)return Promise.resolve(_this.idb)
    return new Promise((resolve,reject)=>{
      const openIDBRequest = _this.IDBFactory.open(dbName,version)
      openIDBRequest.onsuccess = function(){
        _this.idb = this.result
        resolve(this.result)
      }
      openIDBRequest.onerror = function(event){
        console.log(`Failed to open IDB[${dbName}]`)
        reject(event)
      }
      openIDBRequest.onblocked = function(event){
        console.log(`IDB[${dbName}] has been blocked`)
        reject(event)
      }
    })
  }

  async upgradeIDB(dbName:string):Promise<IDBDatabase>{
    const _this = this
    if(!!this.idb)this.idb.close()
    return new Promise((resolve,reject)=>{
      const latestVersion = Date.now()
      const upgradeIDBRequest = _this.IDBFactory.open(dbName,latestVersion)
      upgradeIDBRequest.onupgradeneeded = function(event){
        _this.idb = this.result
        resolve(this.result)
      }
      upgradeIDBRequest.onerror = function(event){
        console.log(`Failed to open IDB[${dbName}]`)
        reject(event)
      }
      upgradeIDBRequest.onblocked = function(event){
        console.log(`IDB[${dbName}] has been blocked`)
        reject(event)
      }
    })
  }


}
