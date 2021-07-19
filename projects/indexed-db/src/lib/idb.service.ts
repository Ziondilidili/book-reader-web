import { Injectable } from '@angular/core';

type IDBDatabaseMap = {
  [name:string]:IDBDatabase
}

@Injectable({
  providedIn: 'root'
})
export class IDBService {
  private idb: IDBDatabaseMap = {}
  private IDBFactory: IDBFactory = indexedDB
  constructor() { }

  /** 打开数据库
   * @param dbName 数据库名称 
   * @param version 版本 
   * @returns 数据库套接字
   */
  async openIDB(dbName: string, version?: number): Promise<IDBDatabase> {
    const _this = this
    if (!!_this.idb[dbName]) return Promise.resolve(_this.idb[dbName])
    return new Promise((resolve, reject) => {
      const openIDBRequest = _this.IDBFactory.open(dbName, version)
      openIDBRequest.onupgradeneeded = function (event) {
        // console.log("uncorrectly method of using IDB")
      }
      openIDBRequest.onsuccess = function () {
        _this.idb[dbName] = this.result
        resolve(_this.idb[dbName])
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
    const _this = this
    if(!!_this.idb[dbName]){
      _this.idb[dbName].close()
      delete _this.idb[dbName]
    }
    return new Promise((resolve, reject) => {
      const latestVersion = Date.now()
      const upgradeIDBRequest = _this.IDBFactory.open(dbName, latestVersion)
      upgradeIDBRequest.onupgradeneeded = function (event) {
        resolve(this.result)
      }
      upgradeIDBRequest.onsuccess = function () {
        _this.idb[dbName] = this.result
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
