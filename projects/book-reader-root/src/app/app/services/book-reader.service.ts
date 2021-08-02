import { Injectable } from '@angular/core';
import { IDBService } from 'projects/indexed-db/src/public-api';
import { IDB } from "projects/book-reader-root/src/environments/environment"

const {
  name: IDBBookReaderName,
  version: IDBBookReaderVersion,
  Book: IDBBookReaderBook,
  Config: IDBBookReaderConfig
} = IDB.BookReader
const {
  name: IDBBookReaderBookName,
  pkey: IDBBookReaderBookPKey,
  keys: IDBBookReaderBookKeys
} = IDBBookReaderBook
const {
  name: IDBBookReaderConfigName,
  pkey: IDBBookReaderConfigPKey,
  keys: IDBBookReaderConfigKeys,
  predefineValue:IDBBookReaderConfigPredefineValue
} = IDBBookReaderConfig

@Injectable({
  providedIn: 'root'
})
export class BookReaderService {

  constructor(
    private idbService: IDBService
  ) { }

  /** 打开BookReader数据库
   * @returns IDBDatabase
   */
  public async openIDBBookReader(): Promise<IDBDatabase> {
    return await this.idbService.openIDB(IDBBookReaderName,idb=>{
      const bookStore = idb.createObjectStore(IDBBookReaderBookName, { keyPath: IDBBookReaderBookPKey })
      // IDBBookReaderBookKeys.forEach(key=>bookStore.createIndex(key.name,key.name,key.options))
      const configStore = idb.createObjectStore(IDBBookReaderConfigName, { keyPath: IDBBookReaderConfigPKey })
      // IDBBookReaderConfigKeys.forEach(key=>store.createIndex(key.name,key.name,key.options))
    },IDBBookReaderVersion)
    
  }

  /** 更新BookReader数据库
   * @returns IDBDatabase
   */
  // public async upgradeIDBBookReader(): Promise<IDBDatabase> {
  //   return this.idbService.upgradeIDB(IDBBookReaderName)
  // }
}
