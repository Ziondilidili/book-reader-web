import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IDBService {
  private idb = new Map<string,IDBDatabase>()
  private IDBFactory: IDBFactory = indexedDB
  constructor() { }

  /** 打开数据库
   * @param dbName 数据库名称 
   * @param version 版本 
   * @returns 数据库套接字
   */
  async openIDB(dbName: string, version?: number): Promise<IDBDatabase> {
    const _this = this
    if (_this.idb.has(dbName)) return Promise.resolve(_this.idb.get(dbName)!)
    return new Promise((resolve, reject) => {
      const openIDBRequest = _this.IDBFactory.open(dbName, version)
      openIDBRequest.onupgradeneeded = function (event) {
        // console.log("uncorrectly method of using IDB")
      }
      openIDBRequest.onsuccess = function () {
        const idb = this.result
        _this.idb.set(dbName,idb)
        resolve(idb)
      }
      openIDBRequest.onerror = function (event) {
        console.log(`Failed to open IDB[${dbName}]`, event)
        reject(event)
      }
      openIDBRequest.onblocked = function (event) {
        console.log(`IDB[${dbName}] has been blocked`, event)
        reject(event)
      }
    })
  }

  /** 升级数据库
   * @param dbName 数据库名称 
   * @returns 数据库套接字
   */
  async upgradeIDB(dbName: string): Promise<IDBDatabase> {
    if(this.idb.has(dbName)){
      this.idb.get(dbName)!.close()
      this.idb.delete(dbName)
    }
    const _this = this
    return new Promise((resolve, reject) => {
      const latestVersion = Date.now()
      const upgradeIDBRequest = _this.IDBFactory.open(dbName, latestVersion)
      upgradeIDBRequest.onupgradeneeded = function (event) {
        resolve(this.result)
      }
      upgradeIDBRequest.onsuccess = function () {
        const idb = this.result
        _this.idb.set(dbName,idb)
      }
      upgradeIDBRequest.onerror = function (event) {
        console.log(`Failed to open IDB[${dbName}]`, event)
        reject(event)
      }
      upgradeIDBRequest.onblocked = function (event) {
        console.log(`IDB[${dbName}] has been blocked`, event)
        reject(event)
      }
    })
  }

}
