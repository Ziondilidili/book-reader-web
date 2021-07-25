import { Injectable } from '@angular/core';
import { IDB } from 'projects/book-reader-root/src/environments/environment';
import { IDBService } from 'projects/indexed-db/src/public-api';
import { BookReaderService } from './book-reader.service';

const {
  Config: IDBBookReaderConfig
} = IDB.BookReader
const {
  name: IDBBookReaderConfigName,
  pkey: IDBBookReaderConfigPKey,
  keys: IDBBookReaderConfigKeys
} = IDBBookReaderConfig

export type Config = {
  [name:string]:string|number|Config|null|undefined
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(
    private bookReaderService:BookReaderService
  ) { }

  /** 打开BookReader数据库Config文档
   * @param mode 
   * @returns 
   */
  private async openIDBBookReaderConfigStore(mode?: IDBTransactionMode): Promise<IDBObjectStore> {
    const idb = await this.bookReaderService.openIDBBookReader()
    if (idb.objectStoreNames.contains(IDBBookReaderConfigName)) {
      return idb.transaction(IDBBookReaderConfigName, mode).objectStore(IDBBookReaderConfigName)
    }
    // console.log(idb)
    const upgradeIdb = await this.bookReaderService.upgradeIDBBookReader()
    // console.log(upgradeIdb)
    const store = upgradeIdb.createObjectStore(IDBBookReaderConfigName, { keyPath: IDBBookReaderConfigPKey })
    // IDBBookReaderConfigKeys.forEach(key=>store.createIndex(key.name,key.name,key.options))
    // upgradeIdb.close()
    return this.openIDBBookReaderConfigStore(mode)
  }

  
}
