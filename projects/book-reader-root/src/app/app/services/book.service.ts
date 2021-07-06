import { Injectable } from '@angular/core';
import { IDBName } from 'projects/book-reader-root/src/environments/environment';
import { IDBService } from 'projects/indexed-db/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private idbService:IDBService
  ) {
    /**
     * 初始化数据库
     * 创建Book本地数据库
     */
     this.idbService.openIDB(IDBName.books)
  }

  async createBook(bookName:string):Promise<void>{
    const idb = await this.idbService.upgradeIDB(IDBName.books)
    if(idb.objectStoreNames.contains(bookName)){
      throw `Book[${bookName}] has been created`
    }
    const store = idb.createObjectStore(bookName,{
      autoIncrement:true
    })
    store.createIndex("chapter","chapterName",{unique:false})
  }

  async openBook(bookName:string,mode?:IDBTransactionMode):Promise<IDBObjectStore>{
    const idb = await this.idbService.openIDB(IDBName.books)
    if(idb.objectStoreNames.contains(bookName)){
      return idb.transaction(bookName,mode).objectStore(bookName)
    }
    await this.createBook(bookName)
    return this.openBook(bookName,mode)
  }
}
