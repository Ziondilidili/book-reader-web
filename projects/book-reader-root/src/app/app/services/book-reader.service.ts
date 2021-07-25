import { Injectable } from '@angular/core';
import { IDBService } from 'projects/indexed-db/src/public-api';
import { IDB } from "projects/book-reader-root/src/environments/environment"

const {
  name: IDBBookReaderName
} = IDB.BookReader

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
    return this.idbService.openIDB(IDBBookReaderName)
  }

  /** 更新BookReader数据库
   * @returns IDBDatabase
   */
  public async upgradeIDBBookReader(): Promise<IDBDatabase> {
    return this.idbService.upgradeIDB(IDBBookReaderName)
  }
}
