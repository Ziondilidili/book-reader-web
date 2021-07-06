import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IDBService {
  private idb?:IDBDatabase
  private IDBFactory:IDBFactory = indexedDB
  constructor() { }

  private bindEventListenderForIDB(idb:IDBDatabase){
    idb.onabort = function(event){
      console.log(`IDB has been aborted`,event)
    }
    idb.onclose = function(event){
      console.log(`IDB has been closed`,event)
    }
    idb.onerror = function(event){
      console.log(`IDB has errors`,event)
    }
    idb.onversionchange = function(event){
      idb.close()
    }
  }

  async openIDB(dbName:string,version?:number):Promise<IDBDatabase>{
    const _this = this
    if(!!_this.idb)return Promise.resolve(_this.idb)
    return new Promise((resolve,reject)=>{
      const openIDBRequest = _this.IDBFactory.open(dbName,version)
      openIDBRequest.onsuccess = function(){
        _this.idb = this.result
        _this.bindEventListenderForIDB(_this.idb)
        resolve(this.result)
      }
      openIDBRequest.onerror = function(event){
        console.log(`Failed to open IDB[${dbName}]`,event)
        reject(event)
      }
      openIDBRequest.onblocked = function(event){
        console.log(`IDB[${dbName}] has been blocked`,event)
        reject(event)
      }
    })
  }

  async upgradeIDB(dbName:string):Promise<IDBDatabase>{
    const _this = this
    // if(!!_this.idb){
    //   _this.idb.close()
    //   _this.idb = undefined
    // }
    return new Promise((resolve,reject)=>{
      const latestVersion = Date.now()
      const upgradeIDBRequest = _this.IDBFactory.open(dbName,latestVersion)
      upgradeIDBRequest.onupgradeneeded = function(event){
        resolve(this.result)
        _this.bindEventListenderForIDB(this.result)
      }
      upgradeIDBRequest.onsuccess = function(){
        _this.idb = this.result
        _this.bindEventListenderForIDB(_this.idb)
      }
      upgradeIDBRequest.onerror = function(event){
        console.log(`Failed to open IDB[${dbName}]`,event)
        reject(event)
      }
      upgradeIDBRequest.onblocked = function(event){
        console.log(`IDB[${dbName}] has been blocked`,event)
        reject(event)
      }
    })
  }


}
