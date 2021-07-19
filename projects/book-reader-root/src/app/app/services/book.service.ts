import { Injectable } from '@angular/core';
import { IDBService } from 'projects/indexed-db/src/public-api';
import { TxtResolverService } from './txt-resolver.service';
import { IDB } from "projects/book-reader-root/src/environments/environment"
import { Book } from '../entity/book';

const {
  name: IDBBookReaderName,
  Book: IDBBookReaderBook
} = IDB.BookReader
const {
  name: IDBBookReaderBookName,
  pkey: IDBBookReaderBookPKey,
  keys: IDBBookReaderBookKeys
} = IDBBookReaderBook
const NullFn = () => { }

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private idbService: IDBService,
    private txtResolver: TxtResolverService
  ) { }

  /** 打开BookReader数据库
   * @returns IDBDatabase
   */
  private async openIDBBookReader(): Promise<IDBDatabase> {
    // const idb = await this.idbService.openIDB(IDBBookReaderName)
    // if(idb.version > 1)return idb
    // idb.close()
    // const upgradedIDB = await this.upgradeIDBBookReader()
    // upgradedIDB.close()
    // return this.openIDBBookReader()
    return this.idbService.openIDB(IDBBookReaderName)
  }

  /** 更新BookReader数据库
   * @returns IDBDatabase
   */
  private async upgradeIDBBookReader(): Promise<IDBDatabase> {
    return this.idbService.upgradeIDB(IDBBookReaderName)
  }
  /** 打开BookReader数据库Book数据文档
   * @param mode 打开模式
   * @returns 事务模式下IDBObjectStore套接字
   */
  private async openIDBBookReaderBookStore(mode?: IDBTransactionMode | undefined): Promise<IDBObjectStore> {
    const idb = await this.openIDBBookReader()
    if (idb.objectStoreNames.contains(IDBBookReaderBookName)) {
      return idb.transaction(IDBBookReaderBookName, mode).objectStore(IDBBookReaderBookName)
    }
    const upgradeIdb = await this.upgradeIDBBookReader()
    const store = upgradeIdb.createObjectStore(IDBBookReaderBookName, { keyPath: IDBBookReaderBookPKey })
    // IDBBookReaderBookKeys.forEach(key=>store.createIndex(key.name,key.name,key.options))
    upgradeIdb.close()
    return this.openIDBBookReaderBookStore(mode)

  }

  /** 将IDBRequest转换为Promise
   * @param request IDBRequest
   * @returns Promise
   */
  private async convertPromise<T = any, R = any>(
    request: IDBRequest<T>,
    convertor: (result: T) => R = result => result as any
  ) {
    return new Promise<R>((resolve, reject) => {
      request.onsuccess = function (ev) {
        const result = this.result
        const convertedResult = convertor(result)
        resolve(convertedResult)
      }
      request.onerror = function (ev) {
        reject(ev)
      }
    })
  }

  /** 列出书籍名称列表
   * @returns 书籍名称列表
   */
  async listBookNames(): Promise<string[]> {
    const store = await this.openIDBBookReaderBookStore()
    const getAllKeysRequest = store.getAllKeys()
    return this.convertPromise(getAllKeysRequest, keys => keys as string[])
  }

  /** 创建书籍
   * @param book 书籍信息
   */
  async createBook(book: Book): Promise<void> {
    const store = await this.openIDBBookReaderBookStore("readwrite")
    const request = store.add(book)
    return this.convertPromise<IDBValidKey, void>(request, NullFn)
  }

  /** 更新书籍
   * @param book 书籍信息 
   */
  async updateBook(book: Book): Promise<void> {
    const store = await this.openIDBBookReaderBookStore("readwrite")
    const request = store.put(book)
    return this.convertPromise<IDBValidKey, void>(request, NullFn)
  }

  /** 删除书籍
   * @param bookName 书籍名称
   */
  async deleteBook(bookName: string): Promise<void> {
    const store = await this.openIDBBookReaderBookStore("readwrite")
    const request = store.delete(bookName)
    return this.convertPromise<undefined, void>(request, NullFn)
  }

  /** 打开书籍
   * @param bookName 书籍名称 
   * @returns 书籍
   */
  async openBook(bookName: string): Promise<Book> {
    const store = await this.openIDBBookReaderBookStore()
    const request = store.get(bookName)
    return this.convertPromise<any, Book>(request)
  }
}
